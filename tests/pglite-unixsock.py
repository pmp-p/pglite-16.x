import socket
import os
import time

# ==================================================================================

import select
import sys
import traceback


def slock():
    global SLOCK
    with open(SLOCK, "wb") as file:
        pass


def sunlock():
    global SLOCK
    os.unlink(SLOCK)


def print_exception(e, out=sys.stderr, **kw):
    kw["file"] = out
    traceback.print_exc(**kw)


sys.print_exception = print_exception

terminateAll = False
FD = -1

# Set the path for the Unix socket
socket_path = "/tmp/.s.PGSQL.5432"

# set base path for I/O
io_path = "/tmp/pglite/base/.s.PGSQL.5432"

SINPUT = f"{io_path}.in"
SLOCK = f"{io_path}.lock.in"

CINPUT = f"{io_path}.out"
CLOCK = f"{io_path}.lock.out"


def dbg(code, data):
    fit=int( 100 / 2 )
    if len(data)>(fit*2):
        print(code,len(data), data[:fit], '...' , data[-fit:] )
    else:
        print(code,str(len(data)).zfill(2), data)


class Client:
    def __init__(self, clientSocket, targetHost, targetPort):
        self.__clientSocket = clientSocket

    def run(self):

        print("Client Thread started")
        steps = 0

        hcmp = b""


        def pump():
            global SKIPS
            nonlocal steps, hcmp
            cdata = None
            if os.path.isfile(CLOCK):
                print("found lock",CLOCK)
                if os.path.isfile(CINPUT):
                    with open(CINPUT, "rb") as file:
                        cdata = file.read()
                    if len(cdata)!=len(hcmp or b""):
                        print()
                        print(f"W/A {len(cdata)} != NA {len(hcmp)}")
                        dbg("W", cdata)
                        dbg("N", hcmp)
                        print()
                        # cdata = hcmp
                    else:
                        print(f"W/A match  {len(cdata)}")
                    os.unlink(CLOCK)
                    hcmp = b""
            return cdata

        if 1:
            try:
                self.__clientSocket.setblocking(0)
            except:
                print(self.__clientSocket, "setblocking failed")


        clientData = b""
        targetHostData = b""
        terminate = False

        while not terminate and not terminateAll:
            inputs = [self.__clientSocket]
            outputs = []

            if len(clientData) > 0:
                outputs.append(self.__clientSocket)

            try:
                inputsReady, outputsReady, errorsReady = select.select(inputs, outputs, [], 1.0)
            except Exception as e:
                sys.print_exception(e)
                break

            data = None
            for inp in inputsReady:
                if inp == self.__clientSocket:
                    data = None
                    try:
                        data = self.__clientSocket.recv(4096)
                    except Exception as e:
                        print("102", e)

                    if data != None:
                        if len(data) > 0:
                            targetHostData += data
                        else:
                            terminate = True
            if targetHostData:
                outputsReady.append('pglite')

            data = pump()
            if data and len(data) > 0:
                clientData += data
                hcmp = b""

            for out in outputsReady:
                if out == self.__clientSocket and (len(clientData) > 0):
                    bytesWritten = self.__clientSocket.send(clientData)
                    #dbg(">", clientData[:bytesWritten])
                    if bytesWritten > 0:
                        clientData = clientData[bytesWritten:]
                        hcmp = b""

                elif out == 'pglite' and (len(targetHostData) > 0):
                    bytesWritten=len(targetHostData)
                    print("unixsocket -> pglite", bytesWritten, targetHostData )
                    if bytesWritten>0:
                        with open(SINPUT, "wb") as file:
                            file.write(targetHostData[:bytesWritten])
                        sunlock()
                        while os.path.isfile(SINPUT):
                            time.sleep(0.016)
                        slock()
                        targetHostData = targetHostData[bytesWritten:]

        #targetHostSocket.close()
        for f in [SINPUT,CINPUT,SLOCK,CLOCK]:
            try:
                os.remove(f)
            except:
                pass

# ===============================================================================


# remove the socket file if it already exists
try:
    os.unlink(socket_path)
except OSError:
    if os.path.exists(socket_path):
        raise


# Create the Unix socket server
server = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)

# Bind the socket to the path
server.bind(socket_path)

# Listen for incoming connections
server.listen(1)

while True:
    # accept connections
    print("Server is listening for incoming connections...")

    # create the initial lock
    slock()
    if os.path.isfile(SINPUT):
        print("cleaned up, (cli)socket->(srv)file", SINPUT)
        os.unlink(SINPUT)

    connection, client_address = server.accept()

    FD = connection.fileno()
    Client(connection, "127.0.0.1", 5432).run()
    print("ClienThread terminating")

    # close the connection
    connection.close()

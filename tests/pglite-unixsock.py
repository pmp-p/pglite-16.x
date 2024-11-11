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

CLOCK_in_progress = False


def dbg(code, data):
    fit = int(100 / 2)
    if len(data) > (fit * 2):
        print(code, len(data), data[:fit], "...", data[-fit:])
    else:
        print(code, str(len(data)).zfill(2), data)


class Client:
    def __init__(self, clientSocket, targetHost, targetPort):
        self.__clientSocket = clientSocket

    def run(self):

        # initial clean up
        for f in [SINPUT, CINPUT]:
            try:
                os.remove(f)
                print(f"removed {f}")
            except:
                pass

        print("Client Thread started")
        steps = 0

        hcmp = b""

        def pump():
            global CLOCK_in_progress
            nonlocal steps, hcmp
            cdata = None
            if not CLOCK_in_progress:
                if os.path.isfile(CLOCK):
                    print(f"{CLOCK} : server is reply in progress ...")
                    CLOCK_in_progress = True

            if os.path.isfile(CINPUT):
                print(f"{CINPUT} : incoming")
                with open(CINPUT, "rb") as file:
                    cdata = file.read()
                os.unlink(CINPUT)
                CLOCK_in_progress = False
            return cdata

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
                outputsReady.append("pglite")

            data = pump()
            if data and len(data) > 0:
                clientData += data
                hcmp = b""

            for out in outputsReady:
                if out == self.__clientSocket and (len(clientData) > 0):
                    bytesWritten = self.__clientSocket.send(clientData)

                    if bytesWritten > 0:
                        clientData = clientData[bytesWritten:]
                        hcmp = b""

                elif out == "pglite" and (len(targetHostData) > 0):
                    bytesWritten = len(targetHostData)
                    print("unixsocket -> pglite", bytesWritten, targetHostData)
                    if bytesWritten > 0:
                        with open(SLOCK, "wb") as file:
                            file.write(targetHostData[:bytesWritten])

                        # atomic
                        os.rename(SLOCK, SINPUT)

                        targetHostData = targetHostData[bytesWritten:]

            time.sleep(0.016)


# ===============================================================================


# remove the socket file if it already exists
try:
    os.unlink(socket_path)
except OSError:
    if os.path.exists(socket_path):
        raise

if "inet" not in sys.argv:
    print(" using unix socket , use 'inet' on cmdline to switch to inet")
    # Create the Unix socket server
    server = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    # Bind the socket to the path
    server.bind(socket_path)
else:
    # create a tcp server instead
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind(("127.0.0.1", 5432))


# Listen for incoming connections
server.listen(1)

while True:
    # accept connections
    print("Server is listening for incoming connections...")

    connection, client_address = server.accept()

    FD = connection.fileno()
    Client(connection, "127.0.0.1", 25432).run()
    print("ClienThread terminating")

    # close the connection
    connection.close()

import { it, expect } from 'vitest'
import { PGlite } from '../../dist/index.js'
import { lo } from '../../dist/contrib/lo.js'

it('lo', async () => {
  const pg = new PGlite({
    extensions: {
      lo,
    },
  })

  await pg.exec('CREATE EXTENSION IF NOT EXISTS lo;')

  await pg.exec(`
    CREATE TABLE test (id SERIAL PRIMARY KEY, data OID);
  `)

  await pg.exec(`
    CREATE TRIGGER test_data_lo BEFORE UPDATE OR DELETE ON test
    FOR EACH ROW EXECUTE FUNCTION lo_manage(data);
  `)

  const text = 'hello world'
  const blob = new Blob([text], { type: 'text/plain' })

  await pg.query(
    `
    INSERT INTO test (data) VALUES (lo_import('/dev/blob'));
  `,
    [],
    {
      blob,
    },
  )

  const res = await pg.query(`
    SELECT lo_export(data, '/dev/blob') AS data FROM test;
  `)

  const data = res.blob
  const asText = await data.text()
  expect(asText).toBe(text)

  await pg.query(`
    DELETE FROM test;
  `)
})

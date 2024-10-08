import { it, expect } from 'vitest'
import { PGlite } from '../../dist/index.js'
import { tcn } from '../../dist/contrib/tcn.js'

it('tcn', async () => {
  const pg = new PGlite({
    extensions: {
      tcn,
    },
  })

  await pg.exec('CREATE EXTENSION IF NOT EXISTS tcn;')

  await pg.exec(`
    CREATE TABLE test (
      id SERIAL PRIMARY KEY,
      name TEXT
    );
    CREATE TRIGGER test_tcn
    AFTER INSERT OR UPDATE OR DELETE ON test
    FOR EACH ROW
    EXECUTE FUNCTION triggered_change_notification();
  `)

  pg.listen('tcn', (payload) => {
    expect(payload).toBe(`"test",I,"id"='1'`)
  })

  await pg.exec("INSERT INTO test (name) VALUES ('test1');")
})

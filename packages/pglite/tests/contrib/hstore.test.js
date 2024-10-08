import { it, expect } from 'vitest'
import { PGlite } from '../../dist/index.js'
import { hstore } from '../../dist/contrib/hstore.js'

it('hstore', async () => {
  const pg = new PGlite({
    extensions: {
      hstore,
    },
  })

  await pg.exec('CREATE EXTENSION IF NOT EXISTS hstore;')

  await pg.exec(`
    CREATE TABLE IF NOT EXISTS test (
      id SERIAL PRIMARY KEY,
      data HSTORE
    );
  `)

  await pg.exec('INSERT INTO test (data) VALUES (\'"name" => "test1"\');')
  await pg.exec('INSERT INTO test (data) VALUES (\'"name" => "test2"\');')
  await pg.exec('INSERT INTO test (data) VALUES (\'"name" => "test3"\');')

  const res = await pg.query(`
    SELECT
      data::JSONB
    FROM test
    WHERE data->'name' = 'test1';
  `)

  expect(res.rows).toEqual([
    {
      data: {
        name: 'test1',
      },
    },
  ])
})

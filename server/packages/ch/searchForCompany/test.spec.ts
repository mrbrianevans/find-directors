import test from 'node:test'
import assert from "assert";
import {main} from "./index.js";
import {config} from "dotenv";
config({path: '../../../.env'})


await test('test function invocation', async function(t){

  await t.test('check for API key', async function(){
    assert(process.env.CH_API_KEY, "API key is not in environment variable")
  })

  await t.test('check for headers and body', async function(){

    const response = await main({companyName: 'test name'})

    console.log('Returned ', response)

    assert('body' in response)

    JSON.parse(response.body)

    assert('headers' in response && response.headers)

    assert('content-type' in response.headers)

    assert.equal(response.headers['content-type'], 'application/json')

  })

  await t.test('check for bad request when name is empty', async function(){

    const response = await main({companyName: ''})

    console.log('Returned ', response)

    assert('body' in response)

    JSON.parse(response.body)

    assert('headers' in response && response.headers)

    assert('content-type' in response.headers)

    assert.equal(response.headers['content-type'], 'application/json')

    assert.equal(response.statusCode, 400)
  })
})

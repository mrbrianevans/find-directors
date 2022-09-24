import test from 'node:test'
import assert from "assert";
import {main} from "./index.js";


await test('test function invocation', async function(t){

  await t.test('check for API key', async function(){
    assert(process.env.CH_API_KEY, "API key is not in environment variable")
  })

  await t.test('check for headers and body', async function(){

    const response = await main({companyName: 'test name'})

    console.log('Returned ', response)

    assert('body' in response && typeof response.body === 'string', 'Response does not have string body')

    assert.doesNotThrow(()=>JSON.parse(response.body), SyntaxError,'Response body could not be parsed')

    assert('headers' in response && response.headers, 'Response does not have headers set')

    assert('content-type' in response.headers, 'Response headers do not have content-type set')

    assert.equal(response.headers['content-type'], 'application/json', 'Content type in response headers is not JSON')

  })

  await t.test('check for bad request when name is empty', async function(){
    const response = await main({companyName: ''})
    console.log('Returned ', response)
    assert.equal(response.statusCode, 400)
  })

  await t.test('good request', async function(){
    const response = await main({companyName: 'avalon'})
    console.log('Returned ', response)
    assert.equal(response.statusCode, 200)
  })
})

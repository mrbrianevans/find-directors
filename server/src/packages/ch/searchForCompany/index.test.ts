import test from 'node:test'
import assert from "assert";
import {main} from "./index.js";


await test('test function invocation', async function(t){

  await t.test('check for API key', async function(){
    assert(process.env.CH_API_KEY, "API key is not in environment variable")
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

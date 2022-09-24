import test from 'node:test'
import assert from "assert";
import {main} from "./index.js";


await test('test getDirectors function invocation', async function(t){

  await t.test('check for API key', async function(){
    assert(process.env.CH_API_KEY, "API key is not in environment variable")
  })

  await t.test('check for bad request when companyNumber is empty', async function(){
    const response = await main({companyNumber: ''})
    console.log('Returned ', response)
    assert.equal(response.statusCode, 400)
  })
  await t.test('check for bad request when companyNumber is missing', async function(){
    const response = await main({})
    console.log('Returned ', response)
    assert.equal(response.statusCode, 400)
  })

  await t.test('good request', async function(){
    const response = await main({companyNumber: '10288387'})
    console.log('Returned ', response)
    assert.equal(response.statusCode, 200)
  })

  await t.test('response body contents', async function(){
    const response = await main({companyNumber: '10288387'})
    console.log('Returned ', response)
    assert.equal(response.statusCode, 200)
    const responseBody = JSON.parse(response.body)
    assert('activeCount' in responseBody, 'activeCount not returned in response body')
    assert('items' in responseBody, 'items not returned in response body')
    if(responseBody.items.length > 0) assert('name' in responseBody.items[0], 'name not in first item')
  })
})

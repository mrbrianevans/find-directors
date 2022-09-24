import test from 'node:test'
import assert from "assert";
import {respondToInvocation} from "./respondToInvocation.js";

/*
Tests scenarios where
1. everything works as expected, status code is 200
2. the request params are invalid, status code is 400
3. the logic throws an error, status is 500
 */

await test('test generic respond to invocation', async function(t){

  await t.test('check for headers and body in response for minimal schema and logic', async function(){

    const returnValue = {success: true}
    const main = respondToInvocation({type: 'object'}, function(){
      return returnValue
    })

    const response = await main({})

    console.log('Returned ', response)

    assert('body' in response && typeof response.body === 'string', 'Response does not have string body')

    assert.doesNotThrow(()=>JSON.parse(response.body), SyntaxError,'Response body could not be parsed')

    assert('headers' in response && response.headers, 'Response does not have headers set')

    assert('content-type' in response.headers, 'Response headers do not have content-type set')

    assert.equal(response.headers['content-type'], 'application/json', 'Content type in response headers is not JSON')

    assert.deepStrictEqual(JSON.parse(response.body), returnValue)

    assert.equal(response.statusCode, 200, 'Status code is not 200' )
  })


  await t.test('check for headers and body in response when input is invalid', async function(){

    const returnValue = {success: false}
    const main = respondToInvocation({type: 'object', properties: {name:{type:'string'}}, required: ['name']}, function(){
      return returnValue
    })

    const response = await main({}) // invoked without name

    console.log('Returned ', response)

    assert('body' in response && typeof response.body === 'string', 'Response does not have string body')

    assert.doesNotThrow(()=>JSON.parse(response.body), SyntaxError,'Response body could not be parsed')

    assert('headers' in response && response.headers, 'Response does not have headers set')

    assert('content-type' in response.headers, 'Response headers do not have content-type set')

    assert.equal(response.headers['content-type'], 'application/json', 'Content type in response headers is not JSON')

    assert.equal(response.statusCode, 400, 'Status code is not 400 when input is invalid' )
  })

  await t.test('check for headers and body in response when logic throws error', async function(){

    const main = respondToInvocation({type: 'object'}, function(){
      throw new Error('Internal server error (simulated)')
    })

    const response = await main({}) // invoked without name

    console.log('Returned ', response)

    assert('body' in response && typeof response.body === 'string', 'Response does not have string body')

    assert.doesNotThrow(()=>JSON.parse(response.body), SyntaxError,'Response body could not be parsed')

    assert('headers' in response && response.headers, 'Response does not have headers set')

    assert('content-type' in response.headers, 'Response headers do not have content-type set')

    assert.equal(response.headers['content-type'], 'application/json', 'Content type in response headers is not JSON')

    assert.equal(response.statusCode, 500, 'Status code is not 500 when logic throws' )
  })

})

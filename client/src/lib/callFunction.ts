
const FUNCTION_API_URL = import.meta.env.VITE_FUNCTION_API_URL;

interface CallFunctionOpts{
  urlSearchParams?: Record<string, string>,body?: Record<string|number, any>, method?: 'GET'|'POST'|'PUT'
}

export async function callFunction(packageName: string, functionName: string, {urlSearchParams,body, method = 'GET'}: CallFunctionOpts = {}){
  const startTime = performance.now()
  const path = `/${packageName}/${functionName}?${new URLSearchParams(urlSearchParams).toString()}`
  const res = await fetch(FUNCTION_API_URL + path, {method, body: JSON.stringify(body)})
  const duration = performance.now() - startTime
  console.log('Call to function', packageName+'/'+functionName, 'took', duration, 'milliseconds. Status', res.status, res.statusText)
  if(res.ok) return res.json()
  else throw new Error('Failed to call function')
}

import {createApiClient} from "@companieshouse/api-sdk-node";

interface InputArguments {
  companyName: string
}

interface ReturnValue{
  headers?: Record<string, string>,
  statusCode?: number,
  body: string
}

async function logic(companyName: string){
  console.log('Searching for company: ', companyName)
  const api = createApiClient(process.env.CH_API_KEY);
  console.time('Call companies house API')
  const matches = await api.alphabeticalSearch.getCompanies(companyName, Date.now().toString(), null, null, 10)
  console.timeEnd('Call companies house API')
  if(matches.httpStatusCode >= 200 && matches.httpStatusCode < 300 && matches.resource) {
    const {company_number, company_name, company_status} = matches.resource.top_hit
    return {company_number, company_name, company_status}
  }
  else{
    throw new Error('Failed to call Companies House API')
  }
}

async function main(args: InputArguments): Promise<ReturnValue>{
  let response: ReturnValue
  try{
    if('companyName' in args && args.companyName){
      const result = await logic(args.companyName)
      response = {headers: { 'content-type':'application/json'}, body: JSON.stringify(result), statusCode: 200}
    }else{
      response = {headers: { 'content-type':'application/json'}, body: JSON.stringify({msg:'Company name not in request'}), statusCode: 400}
    }
  }catch (e) {
    response = {headers: { 'content-type':'application/json'}, body: JSON.stringify({msg:e.message}), statusCode: 500}
  }
  return response
}


export {main}

import type { CompaniesResource } from "@companieshouse/api-sdk-node/dist/services/search/alphabetical-search/types";
import {callApi} from "../../../shared/callApi.js";
import {InputSchema, wrapFunctionWithSchema} from 'do-functions'

async function alphabeticalSearch(name: string, limit: number){
  return callApi<CompaniesResource>(`/alphabetical-search/companies?q=${name}&size=${limit}`)
}

async function logic({companyName}){
  console.log('Searching for company: ', companyName)
  console.time('Call companies house API')
  const matches = await alphabeticalSearch(companyName, 10)
  console.timeEnd('Call companies house API')
  if(matches.httpStatusCode >= 200 && matches.httpStatusCode < 300 && matches.resource) {
    const {company_number, company_name, company_status} = matches.resource.top_hit
    return {company_number, company_name, company_status}
  }
  else{
    console.error(matches)
    throw new Error('Failed to call Companies House API')
  }
}

const schema: InputSchema = {type: 'object', properties: {companyName: {type:'string', minLength: 2}}, required:['companyName']}

export const main = wrapFunctionWithSchema(logic, schema)


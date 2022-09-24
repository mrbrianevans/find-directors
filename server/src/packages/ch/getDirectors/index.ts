import {callApi} from "../../../shared/callApi.js";
import type {Schema} from "jsonschema";
import {respondToInvocation} from "../../../shared/respondToInvocation.js";
import type { CompanyOfficersResource } from "@companieshouse/api-sdk-node/dist/services/company-officers/types.js";

async function officersSearch(companyNumber: string, limit = 20, publicRegister = false){
  return callApi<CompanyOfficersResource>(`/company/${companyNumber}/officers?items_per_page=${limit}${publicRegister?'&register_view=true&register_type=directors':''}`)
}

async function logic({companyNumber}){
  console.log('Getting directors for company: ', companyNumber)
  console.time('Call companies house API')
  const matches = await officersSearch(companyNumber, 10)
  console.timeEnd('Call companies house API')
  if(matches.httpStatusCode >= 200 && matches.httpStatusCode < 300 && matches.resource) {
    const {active_count, items} = matches.resource
    return {activeCount: active_count, items: items.filter(i=>i.officer_role==='director' && !i.resigned_on)
        .map(i=>({name: i.name.split(', ').reverse(), dateOfBirth: i.date_of_birth, nationality: i.nationality, occupation: i.occupation}))
    }
  }
  else{
    console.log("Companies House response code: ", matches.httpStatusCode, 'Body:', matches.resource)
    throw new Error('Failed to call Companies House API')
  }
}

const schema: Schema = {type: 'object', properties: {companyNumber: {type:'string', minLength: 8, maxLength: 8}}, required:['companyNumber']}

export const main = respondToInvocation(schema, logic)


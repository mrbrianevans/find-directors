import {createApiClient} from "@companieshouse/api-sdk-node";

interface InputArguments {
  companyName: string
}

interface ReturnValue{

}

async function main(args: InputArguments): Promise<ReturnValue|null>{
  const api = createApiClient(process.env.CH_API_KEY);
  const matches = await api.alphabeticalSearch.getCompanies(args.companyName, Date.now().toString(), null, null, 10)
  if(matches.httpStatusCode >= 200 && matches.httpStatusCode < 300 && matches.resource) {
    const {company_number, company_name, company_status} = matches.resource.top_hit
    return {company_number, company_name, company_status}
  }
  else{
    console.log('Failed to call Companies House API')
    return null
  }
}


export {main}

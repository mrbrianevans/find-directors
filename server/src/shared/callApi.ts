import type {Resource} from "@companieshouse/api-sdk-node";

export async function callApi<ResponseType>(path: string): Promise<Resource<ResponseType>>{
  const apiUrl = 'https://api.company-information.service.gov.uk'
  const headers =  {Authorization: 'Basic '+Buffer.from(process.env.CH_API_KEY+':').toString('base64')}
  const res = await fetch(apiUrl + path, { headers })
  const resource: ResponseType = await res.json()
  return {httpStatusCode: res.status, resource}
}

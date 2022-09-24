import type {Resource} from "@companieshouse/api-sdk-node";

export async function callApi<ResponseType>(path: string): Promise<Resource<ResponseType>>{
  const apiUrl = 'https://api.company-information.service.gov.uk'
  const headers =  {Authorization: 'Basic '+Buffer.from(process.env.CH_API_KEY+':').toString('base64')}
  const res = await fetch(apiUrl + path, { headers })
  const resource: ResponseType = res.status < 500 ? await res.json() : await res.text().then(t=>({response:t}))
  return {httpStatusCode: res.status, resource}
}

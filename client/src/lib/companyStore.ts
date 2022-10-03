import {buildLocalStore} from "./localStoreFactory.js";

export const company = buildLocalStore<null|{company_number, company_name, company_status}>('companyResult', null)
type DirectorsResults = {items:{name: string, dateOfBirth: {year:number, month: number}, nationality: string, occupation: string, linkPath: string}[]}
export const directors = buildLocalStore<DirectorsResults>('directorsResults', {items:[]})
export const companyNameSearch = buildLocalStore('typedCompanyName', '')


import { person } from "./person"

export interface baptismCertificate
{
    id: number
    number: number
    baptismPlace: string
    baptismDate?: Date
    godFatherName: string
    issuanceDate?: Date
    certified:boolean
    chID: number
    peID: number
    per?: person
}
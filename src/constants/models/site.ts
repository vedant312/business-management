import { ObjectId } from "mongodb"

export interface Site {
  _id: ObjectId
  createdAt: Date
  updatedAt: Date
  name: string
  address: string
  isActive: boolean
  comments: string
  // Fields for tender details
  agreementDate: Date
  completionDate: Date
  agreementInfo: string
  department: string
  tenderInfo: string
  workName: string
  boqCost: number
  fund: string
  agency: string
  rate: string
  estimatedCost: number
  agreementValue: number
}

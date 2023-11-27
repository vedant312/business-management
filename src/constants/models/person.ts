import { ObjectId } from "mongodb"

export interface Person {
  _id: ObjectId
  createdAt: Date
  updatedAt: Date
  name: string
  contact: string
  address: string
  comments: string
  isActive: boolean
}

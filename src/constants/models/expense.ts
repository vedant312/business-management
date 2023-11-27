import { ObjectId } from "mongodb"

import { Entity } from "./entity"

export interface Expense {
  _id: ObjectId
  createdAt: Date
  updatedAt: Date
  date: Date
  subject: string
  amount: number
  site: Entity
  person: Entity
  mode: string
  remarks: string
}

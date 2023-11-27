import { ObjectId } from "mongodb"

import { Entity } from "./entity"

export interface Material {
  _id: ObjectId
  createdAt: Date
  updatedAt: Date
  date: Date
  item: string
  billNo: string
  quantity: number
  materialRate: number
  shippingRate: number
  materialPerson: Entity
  shippingPerson: Entity
  site: Entity
  remarks: string
}

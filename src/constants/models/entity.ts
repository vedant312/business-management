import { ObjectId } from "mongodb"

export interface Entity {
  _id: ObjectId
  name: string
}

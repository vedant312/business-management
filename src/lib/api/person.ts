/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { ObjectId } from "mongodb"

import { Person } from "src/constants/models"

import { personCollection } from "./connect"

const addPerson = async (person: Person) => {
  person.createdAt = new Date()
  person.updatedAt = new Date()
  person.isActive = true

  const collection = await personCollection()
  const result = collection.insertOne(person)

  return result
}

const getPersons = async () => {
  const collection = await personCollection()
  const result = await collection
    .find({})
    .sort({ isActive: -1, completionDate: -1 })
    .toArray()

  return result as Person[]
}

const getActivePersons = async () => {
  const collection = await personCollection()
  const result = await collection
    .find({ isActive: true })
    .sort({ completionDate: -1 })
    .toArray()

  return result as Person[]
}

const getPerson = async (id: string) => {
  const o_id = new ObjectId(id)
  const collection = await personCollection()
  const result = await collection.findOne({ _id: o_id })

  return result as Person
}

const updatePerson = async (person: Person) => {
  if (!person._id) throw new Error("No person id provided")
  person.updatedAt = new Date()

  const collection = await personCollection()
  const result = await collection.updateOne(
    { _id: person._id },
    { $set: person }
  )

  return result
}

const getRecentPersons = async (count: number) => {
  const collection = await personCollection()
  const result = await collection
    .find({})
    .sort({ updatedAt: -1 })
    .limit(count)
    .toArray()

  return result as Person[]
}

export {
  addPerson,
  getPersons,
  getPerson,
  getActivePersons,
  updatePerson,
  getRecentPersons,
}

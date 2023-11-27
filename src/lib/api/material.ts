/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { ObjectId } from "mongodb"

import { Material } from "src/constants/models"

import { materialCollection } from "./connect"

const addMaterial = async (material: Material) => {
  material.createdAt = new Date()
  material.updatedAt = new Date()

  const collection = await materialCollection()
  const result = collection.insertOne(material)

  return result
}

const updateMaterial = async (material: Material) => {
  if (!material._id) throw new Error("No material id provided")
  material.updatedAt = new Date()

  const collection = await materialCollection()
  const result = await collection.updateOne(
    { _id: material._id },
    { $set: material }
  )

  return result
}

const deleteMaterial = async (id: string) => {
  const o_id = new ObjectId(id)
  const collection = await materialCollection()
  const result = await collection.deleteOne({
    _id: o_id,
  })

  return result
}

const getMaterial = async (id: string) => {
  const o_id = new ObjectId(id)
  const collection = await materialCollection()
  const result = await collection.findOne({ _id: o_id })

  return result as Material
}

const getDailyMaterials = async (date: Date) => {
  const queryDate = new Date(date)

  const collection = await materialCollection()
  const result = await collection
    .find({
      date: {
        $gte: new Date(queryDate),
        $lt: new Date(queryDate.setDate(date.getDate() + 1)),
      },
    })
    .sort({ date: -1 })
    .toArray()

  return result as Material[]
}

const getMaterialsByPerson = async (personId: string) => {
  const o_id = new ObjectId(personId)
  const collection = await materialCollection()

  const result = await collection
    .find({
      "materialPerson._id": o_id,
    })
    .sort({ date: -1 })
    .toArray()

  return result as Material[]
}

const getMaterialsByShipper = async (shipperId: string) => {
  const o_id = new ObjectId(shipperId)
  const collection = await materialCollection()

  const result = await collection
    .find({
      "shippingPerson._id": o_id,
    })
    .sort({ date: -1 })
    .toArray()

  return result as Material[]
}

const getMaterialsBySite = async (siteId: string) => {
  const o_id = new ObjectId(siteId)
  const collection = await materialCollection()

  const result = await collection
    .find({
      "site._id": o_id,
    })
    .sort({ date: -1 })
    .toArray()

  return result as Material[]
}

const getRecentMaterial = async (count: number) => {
  const collection = await materialCollection()
  const result = await collection
    .find()
    .sort({ updatedAt: -1 })
    .limit(count)
    .toArray()

  return result as Material[]
}

export {
  addMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterial,
  getDailyMaterials,
  getMaterialsByPerson,
  getMaterialsByShipper,
  getMaterialsBySite,
  getRecentMaterial,
}

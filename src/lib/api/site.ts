/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { ObjectId } from "mongodb"

import { Site } from "src/constants/models"

import { siteCollection } from "./connect"

const addSite = async (site: Site) => {
  site.createdAt = new Date()
  site.updatedAt = new Date()
  site.isActive = true

  const collection = await siteCollection()
  const result = collection.insertOne(site)

  return result
}

const getSites = async () => {
  const collection = await siteCollection()
  const result = await collection
    .find({})
    .sort({ isActive: -1, completionDate: -1 })
    .toArray()

  return result as Site[]
}

const getActiveSites = async () => {
  const collection = await siteCollection()
  const result = await collection
    .find({ isActive: true })
    .sort({ completionDate: -1 })
    .toArray()

  return result as Site[]
}

const getSite = async (id: string) => {
  const o_id = new ObjectId(id)
  const collection = await siteCollection()
  const result = await collection.findOne({ _id: o_id })

  return result as Site
}

const updateSite = async (site: Site) => {
  if (!site._id) throw new Error("No site id provided")
  site.updatedAt = new Date()

  const collection = await siteCollection()
  const result = await collection.updateOne({ _id: site._id }, { $set: site })

  return result
}

const getRecentSites = async (count: number) => {
  const collection = await siteCollection()
  const result = await collection
    .find({})
    .sort({ createdAt: -1 })
    .limit(count)
    .toArray()

  return result as Site[]
}

export {
  addSite,
  getSites,
  getSite,
  getActiveSites,
  updateSite,
  getRecentSites,
}

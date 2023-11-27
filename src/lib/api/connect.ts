import clientPromise from "../mongodb"

const connectToDatabase = async () => {
  const client = await clientPromise
  const db = client.db("biz")

  return { client, db }
}

const connectToCollection = async (collectionName: string) => {
  const { db } = await connectToDatabase()
  const collection = db.collection(collectionName)

  return collection
}

const siteCollection = () => connectToCollection("sites")
const personCollection = () => connectToCollection("persons")
const expenseCollection = () => connectToCollection("expenses")
const materialCollection = () => connectToCollection("materials")

export {
  siteCollection,
  personCollection,
  expenseCollection,
  materialCollection,
}

export default connectToDatabase

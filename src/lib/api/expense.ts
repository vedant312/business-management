/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { ObjectId } from "mongodb"

import { Expense } from "src/constants/models"

import { expenseCollection } from "./connect"

const addExpense = async (expense: Expense) => {
  expense.createdAt = new Date()
  expense.updatedAt = new Date()

  const collection = await expenseCollection()
  const result = collection.insertOne(expense)

  return result
}

const updateExpense = async (expense: Expense) => {
  if (!expense._id) throw new Error("No expense id provided")
  expense.updatedAt = new Date()

  const collection = await expenseCollection()
  const result = await collection.updateOne(
    { _id: expense._id },
    { $set: expense }
  )

  return result
}

const deleteExpense = async (id: string) => {
  const o_id = new ObjectId(id)
  const collection = await expenseCollection()
  const result = await collection.deleteOne({
    _id: o_id,
  })

  return result
}

const getExpense = async (id: string) => {
  const o_id = new ObjectId(id)
  const collection = await expenseCollection()
  const result = await collection.findOne({ _id: o_id })

  return result as Expense
}

const getDailyExpenses = async (date: Date) => {
  const queryDate = new Date(date)

  const collection = await expenseCollection()
  const result = await collection
    .find({
      date: {
        $gte: new Date(queryDate),
        $lt: new Date(queryDate.setDate(date.getDate() + 1)),
      },
    })
    .sort({ date: -1 })
    .toArray()

  return result as Expense[]
}

const getExpensesByPerson = async (personId: string) => {
  const o_id = new ObjectId(personId)
  const collection = await expenseCollection()
  const result = await collection
    .find({
      "person._id": o_id,
    })
    .sort({ date: -1 })
    .toArray()

  return result as Expense[]
}

const getExpensesBySite = async (siteId: string) => {
  const o_id = new ObjectId(siteId)
  const collection = await expenseCollection()
  const result = await collection
    .find({
      "site._id": o_id,
    })
    .sort({ date: -1 })
    .toArray()

  return result as Expense[]
}

const getRecentExpenses = async (count: number) => {
  const collection = await expenseCollection()
  const result = await collection
    .find()
    .sort({ updatedAt: -1 })
    .limit(count)
    .toArray()

  return result as Expense[]
}

export {
  addExpense,
  updateExpense,
  deleteExpense,
  getExpense,
  getDailyExpenses,
  getExpensesByPerson,
  getExpensesBySite,
  getRecentExpenses,
}

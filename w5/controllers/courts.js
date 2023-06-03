const mongodb = require('../db/connect');
const dotenv = require('dotenv');
dotenv.config();
const ObjectId = require('mongodb').ObjectId;

const getCourts = async (req, res, next) => {
  const result = await mongodb.getDb().db('w5-8').collection('pickleball-courts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getCourt = async (req, res, next) => {
  const courtId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('w5-8')
    .collection('pickleball-courts')
    .find({ _id: courtId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const insertCourt = async (req, res, next) => {
  try {
    const collection = await mongodb.getDb().db('w5-8').collection('pickleball-courts');
    const result = await collection.insertOne(req.body);
    res.status(201).json({ id: result.insertedId });
    console.log(`Posted a court in the collection`);
  } catch (error) {
    console.error(error);
  }
};

const updateCourt = async (req, res, next) => {
  try {
    const courtId = new ObjectId(req.params.id);
    const collection = await mongodb.getDb().db('w5-8').collection('pickleball-courts');
    collection.updateOne({ _id: courtId }, { $set: req.body });
    res.sendStatus(204);
    console.log(`Updated a court in the collection`);
  } catch (error) {
    console.error(error);
  }
};

const removeCourt = async (req, res, next) => {
  try {
    const courtId = new ObjectId(req.params.id);
    const collection = await mongodb.getDb().db('w5-8').collection('pickleball-courts');
    collection.deleteOne({ _id: courtId });
    console.log(`Deleted a court in the collection`);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getCourts, getCourt, insertCourt, updateCourt, removeCourt };

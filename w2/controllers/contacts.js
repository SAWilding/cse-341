const mongodb = require('../db/connect');
const dotenv = require('dotenv');
dotenv.config();
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;



const getContacts = async (req, res, next) => {
  const result = await mongodb.getDb().db("Lesson_2").collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); 
  });
};

const getContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("Lesson_2")
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
    });
  };

module.exports = { getContacts, getContact };
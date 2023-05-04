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
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("Lesson_2")
    .collection('contacts')
    .find({ _id: contactId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
    });
  };

const insertContact = async (req, res, next) => {
  const collection = await mongodb.getDb().db("Lesson_2").collection('contacts');
  collection.insertOne(req.body, (error, result) =>{
    if (error) {
      return res.status(500).send(error);
    }
    console.log(`Posted: ${req.body}`)
    res.send(res.result);
  })
}

const updateContact = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const collection = await mongodb.getDb().db("Lesson_2").collection('contacts');
    collection.updateOne(
      { _id: contactId },
      { $set: req.body }
    )
  console.log(`Updated a contact in the collection`);

  } catch (error) {
    console.error(error);
  } 
}

const removeContact = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const collection = await mongodb.getDb().db("Lesson_2").collection('contacts');
    collection.deleteOne({ _id: contactId },)
  console.log(`Deleted a contact in the collection`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getContacts, getContact, insertContact, updateContact, removeContact};
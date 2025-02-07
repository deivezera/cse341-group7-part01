const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllDogs = async (req, res) => {
    //swagger.tags=['Dogs']
    const result = await mongodb.getDatabase().db().collection("dogs").find();
    result.toArray().then((dogs) => {
        res.setHeader('Content-Type', "application/json");
        res.status(200).json(dogs);
    });
};

const getSingleDog = async (req, res) => {
    //swagger.tags=['Dogs']
    const dogId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("dogs").find({ _id: dogId });
    result.toArray().then((dogs) => {
        res.setHeader('Content-Type', "application/json");
        res.status(200).json(dogs[0]);
    });
};

const createDog = async (req, res) => {
    //swagger.tags=['Dogs']
    const dogId = new ObjectId(req.params.id);
    const dog = {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        color: req.body.color,
        breed: req.body.breed
    };
    const response = await mongodb.getDatabase().db().collection("dogs").insertOne({ _id: dogId, ...dog });

    if (response.acknowledged) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Some eror occured while creating the dog.");
    }
};

const updateDog = async (req, res) => {
    //swagger.tags=['Dogs']
    const dogId = new ObjectId(req.params.id);
    const dog = {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        color: req.body.color,
        breed: req.body.breed
    };
    const response = await mongodb.getDatabase().db().collection("dogs").replaceOne({ _id: dogId }, { _id: dogId, ...dog });
    
    if (response.modifiedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Some eror occured while updating the dog.");
    }
};

const deleteDog = async (req, res) => {
    //swagger.tags=['Dogs']
    const dogId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('dogs').deleteOne({ _id: dogId })
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Some eror occured while deleting the dog.");
    }
};

module.exports = {
    getAllDogs,
    getSingleDog,
    createDog,
    updateDog,
    deleteDog
}
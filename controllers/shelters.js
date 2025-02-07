const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllShelters = async (req, res) => {
    //swagger.tags=['Shelters']
    const result = await mongodb.getDatabase().db().collection("shetlers").find();
    result.toArray().then((shelters) => {
        res.setHeader('Content-Type', "application/json");
        res.status(200).json(shelters);
    });
};

const getSingleShelter = async (req, res) => {
    //swagger.tags=['Shelters']
    const shelterId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("shetlers").find({ _id: shelterId });
    result.toArray().then((shelters) => {
        res.setHeader('Content-Type', "application/json");
        res.status(200).json(shelters[0]);
    });
};

const createShelter = async (req, res) => {
    //swagger.tags=['Shelters']
    const shelterId = new ObjectId(req.params.id);
    const shelter = {
        home_team: req.body.home_team,
        away_team: req.body.away_team,
        home_score: req.body.home_score,
        away_score: req.body.away_score,
        home_penalty_count: req.body.home_penalty_count,
        away_penatly_count: req.body.away_penatly_count,
        date: req.body.date
    };
    const response = await mongodb.getDatabase().db().collection("shetlers").insertOne({ _id: shelterId, ...shelter });

    if (response.acknowledged) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Some eror occured while creating the shelter.");
    }
};

const updateShelter = async (req, res) => {
    //swagger.tags=['Shelters']
    const shelterId = new ObjectId(req.params.id);
    const shelter = {
        home_team: req.body.home_team,
        away_team: req.body.away_team,
        home_score: req.body.home_score,
        away_score: req.body.away_score,
        home_penalty_count: req.body.home_penalty_count,
        away_penatly_count: req.body.away_penatly_count,
        date: req.body.date
    };
    const response = await mongodb.getDatabase().db().collection("shetlers").replaceOne({ _id: shelterId }, { _id: shelterId, ...shelter });
    
    if (response.modifiedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Some eror occured while updating the shelter.");
    }
};

const deleteShelter = async (req, res) => {
    //swagger.tags=['Shelters']
    const shelterId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('shetlers').deleteOne({ _id: shelterId })
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Some eror occured while deleting the shelter.");
    }
};

module.exports = {
    getAllShelters,
    getSingleShelter,
    createShelter,
    updateShelter,
    deleteShelter
}
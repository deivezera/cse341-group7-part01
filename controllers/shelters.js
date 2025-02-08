const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllShelters = async (req, res, next) => {
    //swagger.tags=['Shelters']
    try{        
        const result = await mongodb.getDatabase().db().collection("shelters").find();
        result.toArray().then((shelters) => {
            res.setHeader('Content-Type', "application/json");
            res.status(200).json(shelters);
        });
    }catch(err){
        next(err)
    }
};

const getSingleShelter = async (req, res, next) => {
    //swagger.tags=['Shelters']
    try{        
        const shelterId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection("shelters").find({ _id: shelterId });
        result.toArray().then((shelters) => {
            res.setHeader('Content-Type', "application/json");
            res.status(200).json(shelters[0]);
        });
    }catch(err){
        next(err)
    }
};

const createShelter = async (req, res, next) => {
    //swagger.tags=['Shelters']

    try{        
        const shelterId = new ObjectId(req.params.id);
        const shelter = {
            name: req.body.name,
            location: req.body.location,
            owner: req.body.owner,
            phone: req.body.phone,
            email: req.body.email
        };
        const response = await mongodb.getDatabase().db().collection("shelters").insertOne({ _id: shelterId, ...shelter });
    
        if (response.acknowledged) {
            res.status(200).send();
        } else {
            return next(new AppError(response.error || "Some eror occured while creating the shelter.", 500));
        }
    }catch(err){
        next(err)
    }
};

const updateShelter = async (req, res, next) => {
    //swagger.tags=['Shelters']

    try{
        const shelterId = new ObjectId(req.params.id);
        const shelter = {
            name: req.body.name,
            location: req.body.location,
            owner: req.body.owner,
            phone: req.body.phone,
            email: req.body.email
        };
        const response = await mongodb.getDatabase().db().collection("shelters").replaceOne({ _id: shelterId }, { _id: shelterId, ...shelter });
        
        if (response.modifiedCount > 0) {
            res.status(200).send();
        } else {
            return next(new AppError(response.error || "Some eror occured while updating the shelter.", 500));
        }
    }catch(err){
        next(err)
    }
};

const deleteShelter = async (req, res, next) => {
    //swagger.tags=['Shelters']

    try{
        const shelterId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('shelters').deleteOne({ _id: shelterId })
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            return next(new AppError(response.error || "Some eror occured while deleting the shelter.", 500));
        }
    }catch(err){
        next(err)
    }
};

module.exports = {
    getAllShelters,
    getSingleShelter,
    createShelter,
    updateShelter,
    deleteShelter
}
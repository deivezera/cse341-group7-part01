const mongodb = require('../data/database');
const AppError = require('../helpers/AppError');
const ObjectId = require('mongodb').ObjectId;

const getAllOwners = async (req, res, next) => {
    //swagger.tags=['Owners']
    try{
        const result = await mongodb.getDatabase().db().collection("owners").find();
        result.toArray().then((owners) => {
            res.setHeader('Content-Type', "application/json");
            res.status(200).json(owners);
        });
    }
    catch(err){
        next(err)
    }
};

const getSingleOwner = async (req, res, next) => {
    //swagger.tags=['Owners']
    try{
        const ownerId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection("owners").find({ _id: ownerId });
        result.toArray().then((owners) => {
            res.setHeader('Content-Type', "application/json");
            res.status(200).json(owners[0]);
        });
    }
    catch(err){
        next(err)
    }
};

const createOwner = async (req, res, next) => {
    //swagger.tags=['Owners']
    try{
        const ownerId = new ObjectId(req.params.id);
        const owner = {
            firstName: req.body.name,
            lastName: req.body.gender,
            age: req.body.age,
            occupation: req.body.occupation,
            address: req.body.address,
            adoptionDate: req.body.adoptionDate,
            dogAdopted: req.body.dogAdopted,
            dogsAtHome: req.body.dogsAtHome
        };
        const response = await mongodb.getDatabase().db().collection("owners").insertOne({ _id: ownerId, ...owner });
    
        if (response.acknowledged) {
            res.status(200).send();
        } else {
            return next(new AppError(response.error || "Some eror occured while creating an owner.", 500));
        }
    }
    catch(err){
        next(err)
    }
};

const updateOwner = async (req, res, next) => {
    //swagger.tags=['Owners']
    try{
        const ownerId = new ObjectId(req.params.id);
        const owner = {
            firstName: req.body.name,
            lastName: req.body.gender,
            age: req.body.age,
            occupation: req.body.occupation,
            address: req.body.address,
            adoptionDate: req.body.adoptionDate,
            dogAdopted: req.body.dogAdopted,
            dogsAtHome: req.body.dogsAtHome
        };
        const response = await mongodb.getDatabase().db().collection("owners").replaceOne({ _id: ownerId }, { _id: ownerId, ...owner });
        
        if (response.modifiedCount > 0) {
            res.status(200).send();
        } else {
            return next(new AppError(response.error || "Some eror occured while updating the owner.", 500));
        }
    }
    catch(err){
        next(err)
    }
};

const deleteOwner = async (req, res, next) => {
    //swagger.tags=['Owners']
    try{
        const ownerId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('owners').deleteOne({ _id: ownerId })
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            return next(new AppError(response.error || "Some eror occured while deleting the owner.", 500));
        }
    }
    catch(err){
        next(err)
    }
};

module.exports = {
    getAllOwners,
    getSingleOwner,
    createOwner,
    updateOwner,
    deleteOwner
}
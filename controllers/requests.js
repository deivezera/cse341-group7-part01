const mongodb = require('../data/database');
const AppError = require('../helpers/AppError');
const ObjectId = require('mongodb').ObjectId;

const getAllRequests = async (req, res, next) => {
    //swagger.tags=['Requests']
    try{
        const result = await mongodb.getDatabase().db().collection("requests").find();
        result.toArray().then((requests) => {
            res.setHeader('Content-Type', "application/json");
            res.status(200).json(requests);
        });
    }
    catch(err){
        next(err)
    }
};

const getSingleRequest = async (req, res, next) => {
    //swagger.tags=['Requests']
    try{
        const requestId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection("requests").find({ _id: requestId });
        result.toArray().then((requests) => {
            res.setHeader('Content-Type', "application/json");
            res.status(200).json(requests[0]);
        });
    }
    catch(err){
        next(err)
    }
};

const createRequest = async (req, res, next) => {
    //swagger.tags=['Requests']
    try{
        const requestId = new ObjectId(req.params.id);
        const request = {
            requestDate: req.body.requestDate,
            visitScheduled: req.body.visitScheduled,
            firstName: req.body.name,
            lastName: req.body.gender,
            age: req.body.age,
            occupation: req.body.occupation,
            address: req.body.address,
            dogsAtHome: req.body.dogsAtHome
        };
        const response = await mongodb.getDatabase().db().collection("requests").insertOne({ _id: requestId, ...request });
    
        if (response.acknowledged) {
            res.status(200).send();
        } else {
            return next(new AppError(response.error || "Some error occured while creating a request.", 500));
        }
    }
    catch(err){
        next(err)
    }
};

const updateRequest = async (req, res, next) => {
    //swagger.tags=['Requests']
    try{
        const requestId = new ObjectId(req.params.id);
        const request = {
            requestDate: req.body.requestDate,
            visitScheduled: req.body.visitScheduled,
            firstName: req.body.name,
            lastName: req.body.gender,
            age: req.body.age,
            occupation: req.body.occupation,
            address: req.body.address,
            dogsAtHome: req.body.dogsAtHome
        };
        const response = await mongodb.getDatabase().db().collection("requests").replaceOne({ _id: requestId }, { _id: requestId, ...request });
        
        if (response.modifiedCount > 0) {
            res.status(200).send();
        } else {
            return next(new AppError(response.error || "Some eror occured while updating the request.", 500));
        }
    }
    catch(err){
        next(err)
    }
};

const deleteRequest = async (req, res, next) => {
    //swagger.tags=['Requests']
    try{
        const requestId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('requests').deleteOne({ _id: requestId })
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            return next(new AppError(response.error || "Some eror occured while deleting the request.", 500));
        }
    }
    catch(err){
        next(err)
    }
};

module.exports = {
    getAllRequests,
    getSingleRequest,
    createRequest,
    updateRequest,
    deleteRequest
}
const path = require('path');
const UserModel = require('../model/user.model');

let responseObj = {
    "status":"",
    "msg":"",
    "body":{

    }
}


class Usercontroller{

    checkApi = (req, res, next) => {
        try{
            responseObj = {
                "status":"success",
                "msg":"Node REST API is waiting",
                "body":{}
            }
            res.status(200).send(responseObj);
        }catch(error){
            console.log('Error',error)
        }
    }

    getRecord = (req, res, next)  => {
        try{
            UserModel.find({}, (err,docs) => {
                if(err){
                    responseObj = {
                        "status":"error",
                        "msg":"error occured",
                        "body":err
                    }
                    res.status(500).send(responseObj );
                }else{
                    responseObj = {
                        "status":"success",
                        "msg":"Fetch records",
                        "body":docs
                    }
                    res.status(200).send(responseObj );
                }
            })
        }catch(error){
            console.log('Error',error);
        }
    }

    sortRecord = (req, res, next)  => {
        try{
            UserModel.find({}).sort({created_date:-1}).exec((err,docs) => {
                if(err){
                    responseObj = {
                        "status":"error",
                        "msg":"error occured",
                        "body":err
                    }
                    res.status(500).send(responseObj );
                }else{
                    responseObj = {
                        "status":"success",
                        "msg":"Fetch records",
                        "body":docs
                    }
                    res.status(200).send(responseObj );
                }
            })
        }catch(error){
            console.log('Error',error);
        }
    }
    addRecord = (req, res, next)  => {
        try{
            if(!req.body){
                responseObj = {
                    "status":"success",
                    "msg":"No input found",
                    "body":{}
                }
                res.status(500).send(responseObj );
            }else{
                const userRecord = new UserModel(req.body);
                userRecord.save((err,docs)=> {
                    if(err){
                        responseObj = {
                            "status":"success",
                            "msg":"Error occured while adding record into db",
                            "body":err  
                            }
                            res.status(500).send(responseObj );
                        }else{
                            responseObj = {
                                "status":"success",
                                "msg":"Successfully added the record",
                                "body":docs
                            }   
                        }
                        res.status(200).send(responseObj );
                })
               
            }
        }catch(error){
            console.log('Error',error);
        }
    }

        updateRecord  = (req, res, next)  => {
        try{
            if(!req.body){
                responseObj = {
                    "status":"error",
                    "msg":"No input found",
                    "body":{}
                }
                res.status(500).send(responseObj );
            }else if(!req.params.id){
                responseObj = {
                    "status":"error",
                    "msg":"Send ID to update the record",
                    "body":{}
                }
                res.status(500).send(responseObj );
            }else{
                    UserModel.findByIdAndUpdate(req.params.id, req.body, (err,docs) =>{
                        if(err){
                            responseObj = {
                                "status":"error",
                                "msg":"Error occured while updating record into db",
                                "body":err  
                                }
                                res.status(500).send(responseObj );
                        }else{
                            responseObj = {
                                "status":"success",
                                "msg":"Successfully updated the record",
                                "body":docs
                            }   
                        res.status(200).send(responseObj );
                        }
                    })
               
            }
        }catch(error){
            console.log('Error',error);
        }
    }

    searchRecord =(req,res,next) => {
        try{
            if(!req.body){
                responseObj = {
                    "status":"error",
                    "msg":"Input is missing ",
                    "body":{}  
                    }
                    res.status(500).send(responseObj );
            }else{
                //exact match

                UserModel.find({name:{$regex:`^${req.body.search.text.trim()}`,$options:'i'}},(err,docs) => {
                    if(err){
                        responseObj = {
                            "status":"error",
                            "msg":"Input is missing ",
                            "body":{}  
                            }
                            res.status(500).send(responseObj );
                    }else{
                        responseObj = {
                            "status":"sucsess",
                            "msg":"Record match ",
                            "body":docs
                            }
                            res.status(300).send(responseObj );
                    }
                })
            }
        }catch(error){
            console.log('Error :: ', error)
        }
    }

    pagiRecord =(req,res,next) => {
        try{
            if(!req.body){
                responseObj = {
                    "status":"error",
                    "msg":"Input is missing ",
                    "body":{}  
                    }
                    res.status(500).send(responseObj );
            }else{
                //pagination
                //page number
                //no of records

                const currentPage = req.body.currentPage;
                const pageSize = req.body.pageSize;

                const skip = pageSize* (currentPage-1);
                const limit= pageSize;

                UserModel.find({}).skip(skip).limit(limit).exec((err,docs) => {
                    if(err){
                        responseObj = {
                            "status":"error",
                            "msg":"Input is missing ",
                            "body":{}  
                            }
                            res.status(500).send(responseObj );
                    }else{
                        responseObj = {
                            "status":"sucsess",
                            "msg":"Record match ",
                            "body":docs
                            }
                            res.status(300).send(responseObj );
                    }
                })
            }
        }catch(error){
            console.log('Error :: ', error)
        }
    }



}

module.exports = new Usercontroller();
import express from 'express';
import database from '../database.js';
import Joi from 'joi';

let itemSchema = Joi.object({
    brand: Joi.string().min(1).required(),
    model: Joi.string().min(1).required(),
    amount: Joi.number().required(),
    price: Joi.string().min(1).required() 
}); 

export async function productsPOST(req, res){
    let item = req.body;
    let { error } = itemSchema.validate(item);
    if(error === undefined){
        try{
            await database.collection('products').insertOne(item);
            res.sendStatus(201); 
        } catch {
            res.sendStatus(500);
        }         
    } else {
        res.sendStatus(422);
    }
};

export async function productsGET(req, res){
    try{
        let products = await database.collection('products').find().toArray();
        res.send(products);
    } catch {
        res.sendStatus(500);
    }
}
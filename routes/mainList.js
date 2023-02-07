const express = require(`express`)
const mainList = express.Router()
const mongoose = require('mongoose')
const morgan = require('morgan')
const inventory = require("../models/inventory")

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://new-user-1:user1@cluster0.tdpm0km.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

mongoose.set("strictQuery", false);

mongoose.connect('mongodb://127.0.0.1:27017/InventoryDB', 
{useNewUrlParser: true},
(msg) => console.log(msg ? msg : "connected to DB"));


//get all 
mainList.get("/", (req, res, next) => {
    inventory.find((err, stuff) => {
        // console.log("finding")
        if (err) {
            res.status(500).send(err)
            return next (err)
        }
        return res.status(200).send(stuff)
    })
    // console.log('got')
})

//get one
mainList.get("/:stuffId", (req, res, next) => {
    const id = req.params.stuffId
//     inventory.findById(id => )
    //db.myCol.find({_id : ObjectId("60f532903ded77001064ae92")});
    inventory.find({_id: id}, (err, stuff) => {
        if (err) {
            res.status(500).send(err)
            return next (err)
        }
        return res.status(200).send(stuff)
    })
})

//add one
mainList.post("/", (req, res, next) => {
    const newStuff = new inventory(req.body)
    newStuff.save((err, savedStuff) => {
        if (err) {
            res.status(500).send(err)
            return next (err)
        }
        return res.status(200).send(savedStuff)
    })
})


module.exports = mainList
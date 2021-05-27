const express = require("express");
const router = express.Router();
const GroceryModal = require("../models/grocery");

router.post("/add", function(req,res){
    console.log(req.body);
    const groceryItem = new GroceryModal(req.body);
    console.log(GroceryModal);
    groceryItem.save(function(err){
        if(err){
            console.log("err", err);
            res.status(400).send({
                message: err,
            })
        }
        else{
            console.log("Grocery item added succesfully");
            res.send("Grocery Items added successfully");
        }
    })
})

router.get("/getAll", function(req,res){
    GroceryModal.find({},{__v: 0}, function(err, data){
        if(err){
            console.log(err);
            res.status(400).send({
                message: err,
            })
        }else{
            console.log(data);
            res.send({results: data});
        }
    }
)
})

router.put("/updatePurchasedStatus", function(req, res){
    GroceryModal.findOneAndUpdate({
        "_id": req.body._id,
    }, {
        "isPurchased": true,
    }, function(err){
        if(err){
            console.log("err", err);
            res.status(400).send({
                message: err,
            })
        }else{
            res.send("Purchases status updated Successfully");
        }
    })
})

router.delete("/deleteGroceryItem", function(req, res) {
    const groceryItemId = req.body._id;
    GroceryModal.remove({_id: groceryItemId}, function(err){
        if(err){
            console.log("err", err);
            res.status(400).send({
                message: err,
            })
        }else{
            res.status(200).send({"result": "Grocery Item removed successfully"}   );
        }
    })
})

module.exports = router;



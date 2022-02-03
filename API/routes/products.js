const express = require('express');
const router = express.Router();
const Product = require('../models/Product');





router.get('/', async (req, res) => {
    try {
        const result = await Product.find()
        return res.send(result)
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await new Product({
            id: req.body.id,
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            amount: req.body.amount
        }).save()

        return res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/:id', async (req,res) => {
    try {
        await Product.findOneAndUpdate({id: req.params.id}, req.body)
        return res.status(200).send("PRODUCT EDITED")
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/:id', async (req,res) => {

    try {
        await Product.findOneAndDelete({id: req.params.id})
        return res.status(200).send({message: "PRODUCT DELETED"})
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }


})



module.exports = router;

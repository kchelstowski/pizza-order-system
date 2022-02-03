const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product')

router.get('/', async (req, res) => {
    try {
        const result = await Order.find()
        return res.send(result)
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const productsOutOfStock = []
        const orderProducts = await Product.find({id: {$in: req.body.order}})
        orderProducts.forEach((product) => product.amount === 0 && productsOutOfStock.push(product.name))
        if (productsOutOfStock.length === 0) {
            const result = await new Order({
                id: req.body.id,
                client: req.body.client,
                order: req.body.order,
                price: req.body.price,
                date: req.body.date,
                status: req.body.status
            }).save()
            for (const product of req.body.order) {
                const prod = await Product.findOne({id: product})
                await Product.findOneAndUpdate({id: product}, {amount: prod.amount-1})
            }
            return res.status(200).send(result)
        }
        return res.status(500).send(`Making an order failed: those products are not available at the moment: ${productsOutOfStock.toString()}`)
    } catch (err) {
        res.status(500).send(err)
    }
});

router.delete('/:id', async (req,res) => {
    try {
        await Order.findOneAndDelete({id: req.params.id})
        return res.status(200).send({message: "ORDER DELETED"})
    } catch (e) {
        console.log(e)
    }


})

router.patch('/:id', async (req,res) => {
    try {
        await Order.findOneAndUpdate({id: req.params.id}, {status: req.body.status})
        return res.status(200).send({message: "ORDER STATUS CHANGED"})
    }
    catch (e) {
        console.log(e)
    }
})



module.exports = router;

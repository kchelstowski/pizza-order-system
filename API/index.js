const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/users');
const products = require('./routes/products')
const orders = require('./routes/orders')
const Product = require('./models/Product')


const cors = require("cors");
app.use(cors())
const port = 5000;
app.use(express.json());

app.use('/users', users);
app.use('/products',products)
app.use('/orders',orders)

const exampleProducts = require("./example_data/products.json")


const importProducts = async (products) => {
    for (const product of products) {
        await new Product(product).save()
    }
}


//'mongodb+srv://admin:s3cr3t@cluster0.qo5cr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//mongodb://localhost:27017/simple_shop

mongoose.connect('mongodb+srv://admin:s3cr3t@cluster0.qo5cr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(() => {
    console.log('Connected to mongoDB');
    app.listen(port, () => {
        console.log(`App is listening at port ${port}`);
    })
})

  //  .then(() => importProducts(exampleProducts))
    .catch(e => console.log(e))





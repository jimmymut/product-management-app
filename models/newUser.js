const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerUserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    location: String,
    password: String,
    registeredAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const Users = mongoose.model('Users', registerUserSchema);
const Products = mongoose.model('Products', productSchema);

module.exports = {Users, Products };
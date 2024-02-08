const express = require ("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const cors = require("cors")
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

// Connect DB...
mongoose.connect(process.env.MONGO)

// API creation...

app.get("/",(req, res)=>{
    res.send("Express app is running")
})

// Image storage Engine...
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

// Creating upload endpoint...
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'),(req, res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}` 
    })
})

// Schema for creating Products...
const Product = mongoose.model("Product", {
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        require: true
    },
    image:{
        type: String,
        require:true
    },
    category:{
        type:String,
        require: true
    },
    new_price:{
        type: Number,
        require: true
    },
    old_price:{
        type: Number,
        require: true
    },
    date:{
        type: Date,
        defualt: Date.now
    },
    available:{
        type: Boolean,
        default: true
    }
})

// User Schema ...
const Users = mongoose.model("User",{
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})


// Signup...
app.post('/signup', async(req, res)=>{

    const {email, password, name} = req.body
    let check = await Users.findOne({email: email})
    if(check){
        return res.status(400).json({success: false, error: "e-mail Already Exists"})
    }

    let cartData = {}
    for(let i = 0; i< 300; i++){
        cartData[i] = 0;
    }

    const user = new Users({
        name, email, password, cartData
    })

    await user.save()

    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'process.env.JWT_SALT')
    res.json({success: true, token})
})

// Login...
app.post('/login', async(req, res)=>{

    const {email, password} = req.body

    let user = await Users.findOne({email})

    if(user){
        if(password === user.password){
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'process.env.JWT_SALT')
            res.json({success: true, token})
        }
        else{
            res.json({success: false, error: "Incorrect Password!"})
        }
    }

    else{
        res.json({success: false, error: "Incorrect Email!"})
    }
})

// Add new product...
app.post('/addproduct', async (req, res)=>{
    
    const {id, name, image, category, new_price, old_price} = req.body
    
    let products = await Product.find({})
    let lastId
    if(products.length > 0){
        // let productArr = products.slice(-1)
        // let lastProduct = productArr[0]
        // lastId = lastProduct.id + 1
        let lastProduct = products.slice(-1)[0]
        lastId = lastProduct.id + 1
    }
    else{
        lastId=1
    }

    const product = new Product({
        id: lastId, name, image, category, new_price, old_price
    })
    console.log(product)
    await product.save()
    console.log("saved")
    res.json({
        success: true,
        name
    })
})

// Delete a product...
app.delete('/removeproduct', async(req, res)=>{

    const deletedProduct = await Product.findOneAndDelete({id: req.body.id})
    console.log(deletedProduct)
    res.json({
        success: true
    })
})

// User Authentication middleware...
const fetchuser = async(req, res, next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error: "please use the correct auth-token"})
    }
    else{
        try{
            const data = jwt.verify(token, 'process.env.JWT_SALT')
            req.user = data.user
            next()
        }catch(err){
            res.status(401).send({error: err})  
        }
    }
}
// Add to Cart...
app.post('/addtocart', fetchuser, async(req, res)=>{
    
    let userData = await Users.findOne({_id: req.user.id})
    userData.cartData[req.body.itemId] += 1
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
    res.send({sueccess: true, message: "Added to Cart"})
})

// Remove from Cart...
app.post('/removefromcart', fetchuser, async(req, res)=>{
    let userData = await Users.findOne({_id: req.user.id})
    if(userData.cartData[req.body.itemId]>0){
        userData.cartData[req.body.itemId] -=1
        await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
    }
    res.send({success: true, message: "Removed from Cart"})
})

// Get cart items...
app.get('/getcart', fetchuser, async(req, res)=>{
    let userData = await Users.findOne({_id: req.user.id})
    res.json(userData.cartData)
})

// Get all products...
app.get('/allproducts', async(req, res)=>{
    let products = await Product.find({})
    console.log("Total products :",products.length)
    res.send(products)
})

// Start Server...
app.listen(process.env.PORT, (error)=>{
    if(!error){
        console.log(`Server running on PORT ${process.env.PORT}`)
    }
    else{
        console.log("Error: "+error)
    }
})
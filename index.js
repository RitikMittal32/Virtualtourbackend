const express = require('express');
const cors = require("cors");
require('./db/config');
const User = require('./db/User');
const app = express();
const Product = require('./db/Product')
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use(cors());


app.post("/register", async (req,resp)=>{
       let user= new User(req.body);
       let result = await user.save();
       result = result.toObject();
       delete result.password;
       resp.send(result);
})

app.post('/login', async (req,resp)=>{

       if(req.body.password && req.body.email){
              let user = await User.findOne(req.body).select("-password");
              if(user){
                    
                      resp.send(user)
              
              }else{
                     resp.send({result:"No user find"})
              }
       }else{
              resp.send({result:"No user find"})

       }
         

})

app.post('/add-product', async (req,resp) => {
       let product = new Product(req.body);
       let result = await product.save();
       resp.send(result)
})

app.get("/products", async(req,resp)=>{
       let products = await Product.find();
       if(products.length>0){
              resp.send(products)
       }else{
           resp.send({result:"No product's found"})   
       }
})


app.delete('/product/:_id',async (req,resp)=>{
       try{
       resp.send(req.params.id);
       const result = await Product.deleteMany(req.params)
       resp.send("deleted successfully");
       }catch(error){
              console.error("Error detected")
       }
       
})


app.listen(PORT)

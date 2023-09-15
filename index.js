const express=require('express');
const app=express();
const port=5000;
const mongoose=require('mongoose');
const {mongoUrl}=require('./keys')
const cors=require('cors')
const path=require('path');
const__dirname=path.resolve();



require('./models/model')
app.use(express.json())
app.use(require('./routes/auth'))
mongoose.connect(mongoUrl)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "*",
      "https://twitter-clone-mern-sqtg.vercel.app/",
    ],
  })
);
require('./models/post')
app.use(require("./routes/createPost"))
app.use(require('./routes/user'))

app.get('*',function(_,res){
    res.status(404).json({message:"Route Not Found"})
})



mongoose.connection.on("connected",()=>{
    console.log("successfully connected to mongo")
})

mongoose.connection.on("error",()=>{
    console.log("not connected to mongodb")
})


app.listen(port,()=>{
    console.log("Server running on port "+port)
})

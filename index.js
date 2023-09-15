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
app.use(cors())
require('./models/post')
app.use(require("./routes/createPost"))
app.use(require('./routes/user'))

app.use(express.static(path.join(__dirname,"./client/built")));

app.get('*',function(_,res){
    res.sendFile(path.join(__dirname,"./client/built/index.html"),function(err){
        res.status(500).send(err);
    })
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
const express=require('express');
const router=express.Router()
const mongoose=require('mongoose');
const requirelogin = require('../middlewares/requirelogin');
const POST=mongoose.model("POST")


router.get("/allposts", requirelogin, (req,res)=>{
    POST.find().sort({"_id":-1})
    .populate("postedBy", "_id name userName Photo")
    .populate("comments.postedBy","_id name userName Photo")
    .then(posts=>res.json(posts))
    .catch(err=>console.log(err))
})
// create tweet
router.post("/createPost",requirelogin,(req,res)=>{
    const {body,pic}=req.body;
    if(!body || !pic){
        return res.status(422).json({error:"Please add all the fields"})
    }
    req.user
   const posts=new POST({
    body,
    photo:pic,
    postedBy:req.user
   })
   posts.save().then((result)=>{
    return res.json({post:result})
   }).catch(err=>console.log(err))
})
// router.get("/createTweet",requirelogin,(req,res)=>{
//     console.log("hello auth")
// })

router.get("/myposts",requirelogin,(req,res)=>{
    POST.find({postedBy:req.user._id}).sort({"_id":-1})
    .populate("postedBy", "_id name userName")
    .then(myposts=>{
        res.json(myposts)
    })
})

router.put("/like", requirelogin, (req,res)=>{
    POST.findByIdAndUpdate(req.body.postId, {
        $push:{
            likes:req.user._id
        }
    },{
        new:true
    }) .populate("postedBy","_id name Photo")
    .then(result=>res.json(result))
    .catch(err=> res.status(422).json({error:err}))
})

router.put("/unlike", requirelogin, (req,res)=>{
    POST.findByIdAndUpdate(req.body.postId, {
        $pull:{
            likes:req.user._id
        }
    },{
        new:true
    }).populate("postedBy","_id name Photo") 
    .then(result=>res.json(result))
    .catch(err=> res.status(422).json({error:err}))
})

router.put("/comment",requirelogin,(req,res)=>{
    
    const comment={
        comment:req.body.text,
        postedBy:req.user._id,
    }
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .sort({comments:-1})
    .populate("comments.postedBy","_id name userName Photo")
    .populate("postedBy","_id name userName Photo")
    .then(result=>res.json(result))
    .catch(err=> res.status(422).json({error:err}))
})





// to show following posts
router.get("/myfollowingpost",requirelogin,(req,res)=>{
    POST.find({postedBy:{$in:req.user.following}}).sort({"_id":-1})
    .populate("postedBy", "_id name userName")
    .populate("comments.postedBy","_id name userName")
    .then(posts=>{
        res.json(posts)
    })
    .catch(err=>{console.log(err)})
})


router.delete('/delposts/:postId',requirelogin,(req,res)=>{
    POST.findOne({_id:req.params.postId})
    .populate('postedBy','_id')
  .then(data=>{
    if(!data){
        return res.status(422).json({error:data});
    }
    if(req.user._id.toString()==data.postedBy._id.toString()){
      data.deleteOne({_id:req.params.postId})
        return res.json({message:'Post Deleted successfully'})
        
    }
  }).catch(err=>res.status(422).json({error:err}))
    
})
module.exports=router
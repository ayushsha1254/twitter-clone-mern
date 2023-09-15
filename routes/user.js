const express=require('express');
const router=express.Router()
const mongoose=require('mongoose');
const requirelogin = require('../middlewares/requirelogin');
const POST=mongoose.model("POST")
const USER= mongoose.model('USER')
const cors=require('cors')

router.use(cors())
// to get user profile
router.get("/user/:id",(req,res)=>{
    USER.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        POST.find({postedBy:req.params.id})
        .populate("postedBy","_id")
        .then((post)=>{
            // if(err){
            //     return res.status(422).json({error:err})
            // }
            res.status(200).json({user,post})
        })
        }).catch(err=>{
            return res.status(404).json({error:"User not found"})
        })

    })

    // to follow user
    

    router.put('/follow',requirelogin,(req,res)=>{
        USER.findByIdAndUpdate(req.body.followId,{
            $push:{followers:req.user._id}},{
                new:true
            }).then(data=>{
                USER.findByIdAndUpdate(req.user._id,{
                    $push:{following:req.body.followId}},{
                        new:true
                    }
                ).then(result=>res.json(result))
                .catch(err=>{return res.status(422).json({error:err})})
            
        })
    })

  // to unfollow user
  router.put('/unfollow',requirelogin,(req,res)=>{
    USER.findByIdAndUpdate(req.body.followId,{
        $pull:{followers:req.user._id}},{
            new:true
        }).then(data=>{
            USER.findByIdAndUpdate(req.user._id,{
                $pull:{following:req.body.followId}},{
                    new:true
                }
            ).then(result=>res.json(result))
            .catch(err=>{return res.status(422).json({error:err})})
        
    })
})

// to upload profile pic
router.put("/uploadProfilePic", requirelogin,(req,res)=>{
    USER.findByIdAndUpdate(req.user._id,{
        $set:{Photo:req.body.pic}
    },{
        new:true
    }).then(result=>res.json(result))
    .catch(err=>{return res.status(422).json({error:err})})
})

// to upload background profile pic
router.put("/uploadBgProfilePic", requirelogin,(req,res)=>{
    USER.findByIdAndUpdate(req.user._id,{
        $set:{BgPhoto:req.body.pic}
    },{
        new:true
    }).then(result=>res.json(result))
    .catch(err=>{return res.status(422).json({error:err})})
})

// to set bio
router.put("/bio",requirelogin,(req,res)=>{
    const {bio} = req.body;
    USER.findByIdAndUpdate(req.user._id,{
        $set:{bio:bio}
    },{
        new:true
    }).then(result=>res.json(result))
    .catch(err=>{return res.status(422).json({error:err})})
});

module.exports=router;
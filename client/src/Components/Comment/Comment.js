import {React,useEffect,useState} from 'react'
import './Comment.css'
import CloseIcon from '@mui/icons-material/Close';
import { Avatar} from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function Comment({toggler,items}) {
  const[comment,setComment]=useState()
  const [data, setData] = useState([]);
  const navigator=useNavigate();
  const [userphoto,setUserphoto] = useState("")
  const makeComment=(text,id)=>{
    fetch("http://localhost:5000/comment", {
            method:"put",
            headers:{
                'Content-Type':'application/json',
                Authorization:"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                text:text,
                postId:id
              })
        }).then(res=>res.json())
        .then((result)=>{
          setComment("")
            // console.log("The result",result)
            updatePage(result);   
        })
        .catch(err=>console.log(err))
  }

  const updatePage=(result)=>{
    const updatedData=items?.comments?.map((posts)=>{
      if(posts._id===result.id){
        console.log(result)
        return result
      }
      else{
        console.log(posts)
        return posts;
      }
    })
    setData(updatedData);
  }
  

  useEffect(()=>{
    fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then(res=>res.json())
    .then((result)=>{
      console.log('Photo tester:',result.user.Photo)
      setUserphoto(result.user.Photo)
    })
console.log('My data: ',items)
  },[])

  
  return (
    <div className="darkBg1">
    <div className="centered1">
    <div className='CommentModal'>
       <CloseIcon className='closebtn' onClick={()=>toggler()} />
       <div className="CommentBox">
       <Avatar src={userphoto?userphoto:""} className="Avatar"/>
       <textarea value={comment} onChange={(e)=>{setComment(e.target.value)}} type="text" placeholder="Tweet your reply" />
       </div>
       <button className='Replybtn' onClick={()=>{makeComment(comment,items._id);
      toggler(items)
      }} >Reply</button>
   

{/* show comment */}

  <div className='ShowComment'>
<div className="comm">
     {
    items?.comments?.map((com)=>{ 
     return(
      <div className='allcomments'>
     <Avatar src={com?.postedBy?.Photo} className="Avatar"/>
      <h3>{com?.postedBy?.userName}</h3> 
      <p>{com.comment}</p>
      </div>
    )})}
      </div>
      </div>
     </div>
    </div>
</div>

  )
}
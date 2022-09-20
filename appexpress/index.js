const express=require('express');
const app=express();
const middlware=require('./MidlewareLocal');
//middlware global 
app.use(express.json());
const port=9000;
app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`server is running on port ${port}`);
    }
})
//declarer un tableau statique 
const users=[{id:0,email:"racha@gmail.com"},{id:1,email:"Rahma@gmail.com"}];
app.get('/users',middlware,(req,res)=>{
    res.status(200).json({users:users});
})
app.post('/users',(req,res)=>{
    const user=req.body;
    users.push(user);
    res.status(200).json({msg:"user is sucessessfully added !",users:users});

})
app.put("/users/:id",(req,res)=>{
    const id=req.params.id;
    const updatedUser=req.body;
    const foundUser=users.find((el)=> el.id == id);
    if(!foundUser){
        res.status(400).json({msg:"user is not found !" });
    }else{
const usersUpdated= users.map((el)=>{
    if(el.id===id){
        return updatedUser
    }else{
        return el
    }
});
res.status(200).json({msg:"operation done !",users:usersUpdated});
    }
})
app.delete('/users/:id',(req,res)=>{
    const id=req.params.id;
    const userAfterDelete=users.filter((el) =>el.id!=id);
    res.status(200).json({users:userAfterDelete});
});
app.get('/x',(req,res)=>{
    res.sendFile(__dirname+"/views/index.html");
});
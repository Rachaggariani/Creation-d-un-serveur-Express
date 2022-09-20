const middlware=(req,res,next)=>{
const x=5;
if(x>5){
    next();
}else{
    res.status(400).json({msg:"you are not authorized"});
}
};
module.exports=middlware
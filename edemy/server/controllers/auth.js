
import User from "../models/user";
import { comparePassword, hashPassword } from "../utils/auth";
import  jwt  from 'jsonwebtoken';
export const register = async(req,res) => {
    try{
//console.log(req.body);
const {name,email,password}=req.body;

  
//validate
if(!name)  return res.status(400).send("name is required");
if(!password || password.length<6){
    return res
    .status(400)
    .send("password is required and should be 6 charchter");
};
let userExist = await User.findOne({ email }).exec();
if(userExist)return res.status(400).send("email is taken"); 
const hashedPassword = await hashPassword(password);
const user =  new User({
    name,
    email,
    password:hashedPassword,

});
  await user.save(); 
console.log("saved user",user);
return res.json({ok:true});


    }catch (err){
        console.log(err);
        return res.status(400).send("Error.try again");
    }
    
};
export const login = async(req,res) => {
    try{
      //  console.log(req.body);
      const {email,password}=req.body;
      const user  = await User.findOne({ email }).exec();
      if(!user)return res.status(400).send("not user find"); 

      const match  = await comparePassword(password,user.password);
      const token =jwt.sign({_id:user._id},process.env.JWT_SECRET,
        {expiresIn:"7d",
        });
        user.password=undefined;
        res.cookie("token",token,{
            httpOnly:true,
           // secure:true,

        }); 
        res.json(user);


    }catch(err){
        console.log(err);
        return res.status(400).send('error.try again');

    }

};
export const logout = async(req,res)=>{
    try{
        res.clearCookie("jwt");

        return res.json({message:"Signout successs"});

    }catch(err){
        console.log(err);

    }
};

export const currentUser =async(res,req)=>{

    try{
const user=await User.findById(req.user._id).select("-password").exec();
console.log("CURRENT_USER",user);
return res.json(user); 

    }catch(err){
        console.log(err);
    }
};
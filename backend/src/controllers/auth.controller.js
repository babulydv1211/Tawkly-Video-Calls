import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import Jwt from "jsonwebtoken"


export async function signup(req,res){
    const {fullName,email,password}=req.body;

//validators
    try{
        if(!fullName || !email || !password  ){
            return res.status(400).json({message:"All fields are required"});
        }

        if(password.length<6){
            return res.status(400).json({message:"password must be at least 6 characters"});
        }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
      
   const existingUser=await User.findOne({email});
   if(existingUser){
    return  res.status(400).json({message:"Email already exist, please use a different one"});
   }
   
  const idx=Math.floor(Math.random()*100)+1;
  const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`
   
  const newUser = await User.create({
    fullName,
    email,
    password,
    profilePic:randomAvatar,
  });

  // ye user create hoga stream.io per
   try {
      await upsertStreamUser ({
      id:newUser._id.toString(),
       name:newUser.fullName,
      image:newUser.profilePic || "",
   });
      console.log(`Stream user create for ${newUser.fullName}`);
    } catch(error){
    console.log("Error creating Stream user",error);

    }

  
  
  //JWTtoken
  // yaha jwt ka session expire date h yani token for authentication
  
  const token=Jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
    expiresIn:"7d"
  })
  //response send krna h cookie
  res.cookie("jwt",token,{
    maxAge:7*24*60*1000,
    httpOnly:true, //prevent xss attacks,
    sameSite:"strict", //prevent CSRF attack
    secure:process.env.NODE_ENV ==='production'

  })
            
  res.status(201).json({success:true,user:newUser})
    }catch(error){
      console.log("Error in signup controller",error);
      res.status(500).json({message:"Internal Server Error"})
    }
}

//login section
export async function login(req,res){
    try{
     const { email, password}=req.body;
     if(!email || ! password){
        return res.status(400).json({message:"All fields are required"});
     }

     const user = await User.findOne({email});
     if(!user) return res.status(400).json({message:"Invalid email or password"});

     const isPasswordCorrect= await user.matchPassword(password)
    if(!isPasswordCorrect) return res.status(401).json({message:"Invalid email or password"});
    
  //jwttoken

   const token=Jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
    expiresIn:"7d",
  })

  res.cookie("jwt",token,{
    maxAge:7*24*60*1000,
    httpOnly:true, //prevent xss attacks,
    sameSite:"strict", //prevent CSRF attack
    secure:process.env.NODE_ENV ==='production'
  })
   
  res.status(200).json({success:true,user});

    }catch(error){
     console.log("Error in login controller",error.message);
     res.status(500).json({message:"Internal Server Error"});
    }
}


// logout function
export function logout(req,res){
    res.clearCookie('jwt')
    res.status(200).json({success:true,message:" Logout successfully"});
}

//onboarding function
export async function onboard(req,res) {
    
    try{
      
   const userId = req.user._id
   const {fullName,bio,nativeLanguage,learningLanguage,location} = req.body
   
 if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
    return res.status(400).json({
        message:"All fields are required",
        
        missingFields:[
        !fullName && "fullName",
        !bio && "bio",
        !nativeLanguage && "nativeLanguage",
        !learningLanguage && "learningLanguage",
        !location && "location",
        ].filter(Boolean),
    });
   }   

   const updatedUser = await User.findByIdAndUpdate(userId,{
    ...req.body,
    isOnboarded:true,
   },{new:true})

   if(!updatedUser) return res.status(404).json({message:"User not found"});

   //TODO: UPDATE THE USER INFO IN STREAMG
   //sath hi stream live per hi update ho
   try{
      await upsertStreamUser({
        id:updatedUser._id.toString(),
        name:updatedUser.fullName,
        image:updatedUser.profilePic || "",
      })

      console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
   }catch(streamError){
      console.log("Error updating Stream user during onboarding:",streamError)
   }


   res.status(200).json({success:true,user:updatedUser});

    }catch(error){
        console.error("Onboarding error",error);
        res.status(500).json({message:"Internal server Error"});

    }

}
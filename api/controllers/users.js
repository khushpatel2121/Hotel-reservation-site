import User from "../models/Users.js";



export const updateUsers = async(req,res,next) =>{
    try{
        const updateUsers = await User.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new:true}
        )
        res.status(200).json(updateUsers)
    }catch{
       next(err)
    }
}

export const deleteUsers = async(req,res,next) =>{
    try{
        await User.findByIdAndDelete(req.params.id);
         res.status(200).json("Users Deleted")
     }catch{
       next(err)
     }
}

export const getUsers = async(req,res,next) =>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch{
        next(err)
    }
}

export const getAllUsers = async(req,res,next) =>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch{
       next(err)
    }
}

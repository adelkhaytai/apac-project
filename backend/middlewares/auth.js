
import jwt from "jsonwebtoken"
import User from "../models/user.js"

export const isAuthinticator = async(req,res,next)=>{
    try {
            const {token} = req.cookies ;   
            if(!token) return next("login forst to access to this resource",401)
                const decoded = await jwt.verify(token , process.env.JWT_SECRET);
                req.user = await User.findById(decoded._id) ;
                // console.log(req.user)
            next()
    } catch (error) {
        console.log(error)
    }
}

export const authorizeRoles = (...roles) =>{
    return (req,res,next)=>{
        if (!roles.includes(req?.user?.role) ){
            return next(`Role : ${req?.user?.role} is not allowed to access this resource` , 403)
        }
        next() ;
    }
}


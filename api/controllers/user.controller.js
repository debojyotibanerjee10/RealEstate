import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';


export const test = (req, res) => {
    res.json({
      message: 'Api route is working!',
    });
  };


  export const updateUser = async (req, res, next) => {

    if (req.user.id !== req.params.id){
      return next(errorHandler(401, 'You can only update your own account!'));
    }
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
  
      const { password, ...rest } = updatedUser._doc;
  
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }

  }



  export const deleteuser=async(req,res,next)=>{
      if(req.user.id!==req.params.id){
        return next(errorHandler(401,"You can delete only your account"));
      }
      try{
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        res.status(200).json({
          message:"User has been deleted"
        })

      }catch(err){
        next(err)
      }
  }

  export const signout=async(req,res,next)=>{
    try{
      res.clearCookie("access_token");
      res.status(200).json({
        message:"User Signout successfully"
      })
    }catch(err){
      next(err);
    }
  }
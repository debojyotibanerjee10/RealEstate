import Listing from "../models/listing.model.js";

export const createListing=async(req,res,next)=>{
    try{
        const lisitng=new Listing(req.body); 
        await lisitng.save();
        res.status(200).json(lisitng);
    }catch(err){
        next(err);
    }
}
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

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
  
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
  
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You can only delete your own listings!'));
    }
  
    try {
      await Listing.findByIdAndDelete(req.params.id);
      res.status(200).json('Listing has been deleted!');
    } catch (error) {
      next(error);
    }
  };
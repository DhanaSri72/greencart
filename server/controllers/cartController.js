//import User from "../models/User.js" this is original code

//Update User CartData :/api/cart/update

// export const updateCart = async (req,res)=>{
//     try{
//         const {userId,cartItems} = req.body
//         await User.findByIdAndUpdate(userId,{cartItems})
//         res.json({success:true,message: 'Cart Updated'})
//     }catch(error){
//         console.log(error.message)
//         res.json({success:false, message: error.message})
//     }
// } 


// import User from '../models/User.js';
// //Update user cart data:/api/cart/update
// export const updateCart = async(req,res)=>{
//     try{
//         const userId = req.User._id;//get from auth middleware
//         const {cartItems} = req.body;
//         await User.findByIdAndUpdate(userId,{cartItems});
//         res.json({success:true,message:'Cart Updated'})
//     }catch(error){
//         console.log(error.message)
//         res.json({success:false,message:error.message})
//     }
// }


import User from "../models/User.js";

// Update User CartData : /api/cart/update
export const updateCart = async (req, res) => {
    try {
        // Use the user ID from the authenticated user (provided by authUser middleware)
        const userId = req.user.id; // Assuming req.user is set by the authUser middleware
        
        // Get the cartItems from the request body
        const { cartItems } = req.body;
        
        // Update the user's cart data in the database
        await User.findByIdAndUpdate(userId, { cartItems });
        
        // Return a success response
        res.json({ success: true, message: 'Cart Updated' });
    } catch (error) {
        // Log and return the error message if something goes wrong
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// import Address from "../models/Address.js"

// //Add address :/api/address/add
// // export const addAddress = async (req,res)=>{
// //     try{
// //         const {address, userId} = req.body
// //         await Address.create({...address,userId})
// //         res.json({success:true,message: "Address added successfully"})
// //     }catch(error){
// //         console.log(error.message);
// //         res.json({success: false,message:error.message});
// //     }
// // }

// // Add address : /api/address/add
// export const addAddress = async (req, res) => {
//     try {
//         const { address } = req.body; // Get address object only
//         const userId = req.user._id;   // Get userId from auth middleware
//         await Address.create({ ...address, userId });
//         res.json({ success: true, message: "Address added successfully" });
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// };


// //Get Address :/api/address/get

// // export const getAddress = async(req,res)=>{
// //     try{
// //         const {userId} = req.body
// //         const addresses = await Address.find({userId})
// //         res.json({success:true,addresses})
// //     }catch(error){
// //         console.log(error.message);
// //         res.json({success: false,message:error.message});
// //     }
// // }


// // Get Address : /api/address/get
// export const getAddress = async (req, res) => {
//     try {
//         const userId = req.user._id; // Get userId from auth middleware
//         const addresses = await Address.find({ userId });
//         res.json({ success: true, addresses });
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// };






import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.user._id; // get userId from auth middleware
    const addressData = req.body; // all address fields sent flat from frontend

    await Address.create({ ...addressData, userId });

    res.json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const addresses = await Address.find({ userId });
    res.json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// import Product from '../models/Product.js';
// import Order from '../models/Order.js'

// //place order COD :/api/order/cod
// export const placeOrderCOD = async(req,res)=>{
//     try{
//         const {userId, items, address} = req.body;
//         if(!address || items.length === 0){
//             return res.json({success:false, message:'Invalid Data'})
//         }
//         //Calculate Amount Using Items
//         let amount = await items.reduce(async(acc,item)=>{
//             const product = await Product.findById(item.product);
//             return (await acc) + product.offerPrice * item.quantity;
//         },0) 
//         //Add Tax charge (2%)
//         amount += Math.floor(amount * 0.02);
//         await Order.create({
//             userId,
//             items,
//             amount,
//             address,
//             paymentType:'COD',
//         });
//         return res.json({success:true,message:'Order Placed Successfully'})
//     }catch(error){
//         return res.json({success:false,message: error.message});
//     }
// }

// //get Orders by User Id :/api/order/user
// export const getUserOrders = async(req,res)=>{
//     try{
//         const {userId} = req.body;
//         const orders = await Order.find({
//             userId,
//             $or: [{paymentType:'COD'},{isPaid: true}]
//         }).populate('items.product address').sort({createAt : -1});
//         res.json({success: true, orders})
//     }catch(error){
//         res.json({success:false, message: error.message});
//     }
// }

// //get all orders ( for seller / admin) :/api/order/seller

// export const getAllOrders = async(req,res)=>{
//     try{
//         const orders = await Order.find({
//             $or: [{paymentType:'COD'},{isPaid: true}]
//         }).populate('items.product address').sort({createAt: -1})
//         res.json({success: true, orders})
//     }catch(error){
//         res.json({success:false, message: error.message});
//     }
// }


// import Product from '../models/Product.js';
// import Order from '../models/Order.js';

// // place order COD :/api/order/cod
// export const placeOrderCOD = async (req, res) => {
//     try {
//         const { userId, items, address } = req.body;
//         if (!address || items.length === 0) {
//             return res.json({ success: false, message: 'Invalid Data' });
//         }

//         // Calculate Amount Using Items
//         let amount = 0;

//         // Fetch all products and calculate total amount
//         for (const item of items) {
//             const product = await Product.findById(item.product);
//             if (!product) {
//                 return res.json({ success: false, message: `Product ${item.product} not found` });
//             }
//             amount += product.offerPrice * item.quantity;
//         }

//         // Add Tax charge (2%)
//         amount += Math.floor(amount * 0.02);

//         // Create the order
//         await Order.create({
//             userId,
//             items,
//             amount,
//             address,
//             paymentType: 'COD',
//         });

//         return res.json({ success: true, message: 'Order Placed Successfully' });
//     } catch (error) {
//         console.error(error);  // Log error for debugging
//         return res.json({ success: false, message: error.message });
//     }
// };

// // get Orders by User Id :/api/order/user
// export const getUserOrders = async (req, res) => {
//     try {
//         const userId = req.user._id;  // Get userId from authenticated user
//         const orders = await Order.find({
//             userId,
//             $or: [{ paymentType: 'COD' }, { isPaid: true }],
//         }).populate('items.product address').sort({ createdAt: -1 });

//         res.json({ success: true, orders });
//     } catch (error) {
//         console.error(error);  // Log error for debugging
//         res.json({ success: false, message: error.message });
//     }
// };

// // get all orders (for seller / admin) :/api/order/seller
// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({
//             $or: [{ paymentType: 'COD' }, { isPaid: true }],
//         }).populate('items.product address').sort({ createdAt: -1 });

//         res.json({ success: true, orders });
//     } catch (error) {
//         console.error(error);  // Log error for debugging
//         res.json({ success: false, message: error.message });
//     }
// };

import Product from '../models/Product.js';
import Order from '../models/Order.js';

// Place order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from auth middleware
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: 'Invalid Data' });
    }

    // Calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: `Product ${item.product} not found` });
      }
      amount += product.offerPrice * item.quantity;
    }

    // Add 2% tax
    amount += Math.floor(amount * 0.02);

    // Create order
    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: 'COD',
    });

    return res.json({ success: true, message: 'Order Placed Successfully' });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Get Orders by User Id : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from auth middleware
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: 'COD' }, { isPaid: true }],
    })
      .populate('items.product address')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get all orders (for seller/admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: 'COD' }, { isPaid: true }],
    })
      .populate('items.product address')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

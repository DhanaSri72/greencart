// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({

//     userId:{type: String,required: true, ref:'user'},
//     items:[{
//         product:{type: String,required: true, ref:'product'},
//         quantity:{type: Number,required: true}
//     }],
//     amount:{type: Number, required:true},
//     address:{type: String, required:true, ref:'address'},
//     status:{type: String, required:true,default:'Order placed'},
//     PaymentType:{type: String, required:true},
//     isPaid:{type:Boolean,required:true, default:false},

// },{timestamps:true})

// const Order = mongoose.models.order || mongoose.model('order', orderSchema)

// export default Order


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Changed to ObjectId and ref to 'User'
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' }, // Changed to ObjectId and ref to 'Product'
        quantity: { type: Number, required: true },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Address' }, // Changed to ObjectId and ref to 'Address'
    status: { type: String, required: true, default: 'Order placed' },
    paymentType: { type: String, required: true },
    isPaid: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema); // Corrected model name case

export default Order;

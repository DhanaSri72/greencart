// import mongoose from "mongoose";

// const addressSchema = mongoose.Schema({

//     userId:{type: String, required: true},
//     firstName:{type: String, required: true},
//     lastName:{type: String, required: true},
//     email:{type: String, required: true},
//     street:{type: String, required: true},
//     city:{type: String, required: true},
//     state:{type: String, required: true},
//     zipcode:{type: Number, required: true},
//     country:{type: String, required: true},
//     phone:{type: String, required: true}

// })

// const Address = mongoose.models.address || mongoose.model('address', addressSchema)

// export default Address


import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, // Changed to ObjectId for user reference
    required: true, 
    ref: 'User' // Assuming you're referencing the User model
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: Number, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true }
});

const Address = mongoose.models.Address || mongoose.model('Address', addressSchema);

export default Address;

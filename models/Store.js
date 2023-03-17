// const mongoose = require('mongoose');
// const validator = require('validator');
// const {ObjectId}= mongoose.Schema.Types;

// const storeSchema = new mongoose.Schema({
//     name: {
//         type:String,
//         trim:true,
//         required:[true,'Please provide a Store name'],
//         lowercase: true,
//         enum:{
//             values:["Dhaka","Chittagong","Rajshahi","Shylet","Khulna","Barishal","Rangpur","Mymensingh"],
//             message: "{VALUE} is not a valid name "
//         }
//     },
//     description: String,
//     status:{
//         type: String,
//         enum:['active','inactive'],
//         default:'active'
//     },
//     manager:{
//         name: String,
//         contactNumber: String,
//         id:{
//             type: ObjectId,
//             ref: 'User'
//         }
//     }


// },{
//     timestamps:true
// })
// const Store = mongoose.model("Store",storeSchema);
// exports = Store;
const mongoose= require('mongoose');
const {ObjectId}= mongoose.Schema.Types;

const stockSchema = new mongoose.Schema({
    productId:{
        type: ObjectId,
        required: true,
        ref:"Product"

    },
    name:{
      type: String,
      required: [true,"Please provide a name for this product"],
      trim: true,
      unique:[ true,'Name must be unique'],
      minLength: [3,"Name must be at least 3 characters"],
      maxLength: [100,'Name is too large'],
      lowercase: true
    },
    description:{
      type: String,
      required: true
    },
    price:{
      type: Number,
      required: true,
      min:[0,'price can not be negative ' ]
    },
    quantity:{
      type: Number,
      required: true,
      min:[0,'quantity can not be negative ' ]
    },
     status:{
          type:String,
          required:true,
          enum:{
            values:["in-stock","out-of-stock","discontinued"],
            message:" Status can not be {VALUE}"
          }
        },
    unit:{
      type: String,
      required: true,
      enum:{
        values:["kg","liter","pcs","bag"],
        message:"unit value can not be {VALUE}, must be kg/liter/pcs/bag "
      }
    },
    imageURLs:[{
      type: String,
      required: true,
      validate:{
        validator:(value)=>{
          if(!Array.isArray(value)){
            return false
          }
          let isValid = true;
          value.forEach(url=>{
            if(!validator.isURL(url)){
              isValid = false;
            }
          })
          return isValid

        },

        message: "Please provide valid Image url"

      }
      
    }],
    category:{
      type: String,
      required: true

    },
    brand:{
      name:{
        type: String,
        required:true
      },
      id:{
        type: ObjectId,
        ref:"Brand",
        required: true
      }
    },
    store:{
        name: {
            type:String,
            trim:true,
            required:[true,'Please provide a Store name'],
            lowercase: true,
            enum:{
                values:["Dhaka","Chittagong","Rajshahi","Shylet","Khulna","Barishal","Rangpur","Mymensingh"],
                message: "{VALUE} is not a valid name "
            }
        },
        id:{
            type: ObjectId,
            required: true,
            ref:"Store"
        }
    },
    supplierBy:{
        name:{
            type:String,
            trim:true,
            required:[true,'Please provide a Supplier name'],

        },
        id:{
            type: ObjectId,
            ref:"Supplier"
        }
    }
    
  
  },{
    timestamps:true
  })
  // middlewares for saving data pre/post
  productSchema.pre('save',function(next){
    console.log("Before saving data")
    if(this.quantity == 0){
      this.status= 'out-of-stock'
  
    }
    next();
  })
 
  
  const Stock = mongoose.model("Stock",stockSchema)

  module.exports= Stock;
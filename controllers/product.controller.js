const Product = require("../models/Product");
const { getProductServices, createProductService, updateProductService, bulkUpdateProductService } = require("../services/product.services")


exports.getProducts= async(req,res,next)=>{
    try {
      const products = await getProductServices();
      // const products = await Product.find({_id:"640d0fc24c601507582fd804",name:"chal"});
      // const products = await Product.find({$or:[{_id:"640d0fc24c601507582fd804"}, {name:"fhdfhhf"}]});
      // const products = await Product.find({_id:"640d0fc24c601507582fd804"});
      // const products = await Product.find({status:{$ne: "out-of-stock"}});
      // const products = await Product.find({quantity:{$gt: 100}});
      // const products = await Product.find({quantity:{$gte: 100}});
      // const products = await Product.find({name:{$in: ['chal','dhal']}});
      // const products = await Product.find({},'name quantity');
      // const products = await Product.find({},'-name -quantity');
      // const products = await Product.find({}).limit(2);
      // const products = await Product.find({}).sort({quantity:-1});
      // const products = await Product.find({}).select({name:1});
      // const products = await Product.where('name').equals('chal').where('quantity').gt(100);
      // const products = await Product.where('name').equals(/\w/).where('quantity').gt(100).limit(2);
    //   const product = await Product.findById("640d0fc24c601507582fd804");
      res.status(200).json({
        status:"success",
        data: products
      })
      
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message:"could not find the data",
        error: error.message
      })
      
    }
  }

  exports.createProducts=async(req,res,next)=>{
    try {
     // save or create method
     // save method
     // const product = new Product(req.body);
     // const result = await product.save();
     // create method
     const result = await createProductService(req.body)
     // if(product.quantity == 0){
     //   product.status= 'out-of-stock'
   
     // }
     result.logger();
     
     res.status(200).json({
       status:"success",
       message:"Data inserted successfully",
       data: result
   
     })
     
    } catch (error) {
     res.status(400).json({
       status:'fail',
       message:"data is not inserted",
       error: error.message
   
     })
     
    }
   
   }

   exports.updateProduct=async(req,res,next)=>{
    try {
      const {id} = req.params;
      const result = await updateProductService(id,req.body);
      res.status(200).json({
        status:"success",
        message:" Successfully updated the product"
      })
      
    } catch (error) {
      res.status(400).json({
        status:'fail',
        message:"could not update the product",
        error: error.message
    
      })
      
    }
   }
   exports.bulkUpdateProduct=async(req,res,next)=>{
    try {
      console.log('requested',req.body)
      const result = await bulkUpdateProductService(req.body);
      console.log('result',result)
      res.status(200).json({
        status:"success",
        message:" Successfully updated the product",
        data: result
        
      })
      
    } catch (error) {
      res.status(400).json({
        status:'fail',
        message:"could not update the product",
        error: error.message
    
      })
      
    }
   }
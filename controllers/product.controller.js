const Product = require("../models/Product");
const { getProductServices, createProductService, updateProductService, bulkUpdateProductService, deleteProductByIdService, bulkDeleteProductService } = require("../services/product.services")

// http://localhost:5000/api/v1/product?sort=quantity,-price&fields=name,description,-_id
// http://localhost:5000/api/v1/product?price[gt]=100
exports.getProducts = async (req, res, next) => {
  try {
    // console.log(req.query)
   let filters = { ...req.query };
    const excludeFields = ['sort', 'page', 'limit'];
    excludeFields.forEach(field => delete filters[field]);
    // console.log('original object', req.query)
    // console.log('queryObject', queryObject)
    let filterString = JSON.stringify(filters);
   filterString =filterString.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`)
   
   filters=JSON.parse(filterString)


    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      queries.sortBy = sortBy;
      console.log(sortBy)
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      queries.fields = fields;
      console.log(fields)
    }
    if (req.query.page) {
      
      const {page=1,limit=10}= req.query;
      const skip = (page - 1)*parseInt(limit);
      queries.skip=skip;
      queries.limit= parseInt(limit)

      // 50 products
      // page 1 = 1-10
      // page 2 = 11-20
      // page 3 = 21-30    ---->page 3----->skip 1-20 
      // page 4 = 31-30     ---->page 4----->skip 1-30 
      // page 5 = 41-50

      
        }

    const products = await getProductServices(filters, queries);
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
    console.log(products)
    res.status(200).json({
      status: "success",
      data: products
    })

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "could not find the data",
      error: error.message
    })

  }
}

exports.createProducts = async (req, res, next) => {
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
      status: "success",
      message: "Data inserted successfully",
      data: result

    })

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "data is not inserted",
      error: error.message

    })

  }

}

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body);
    res.status(200).json({
      status: "success",
      message: " Successfully updated the product"
    })

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "could not update the product",
      error: error.message

    })

  }
}
exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    console.log('requested', req.body)
    const result = await bulkUpdateProductService(req.body);
    console.log('result', result)
    res.status(200).json({
      status: "success",
      message: " Successfully updated the product",
      data: result

    })

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "could not update the product",
      error: error.message

    })

  }
}
exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id)

    res.status(200).json({
      status: "success",
      message: " Successfully delete the product",
      data: result

    })

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "could not delete the product",
      error: error.message

    })

  }
}

exports.bulkDeleteProductById = async (req, res, next) => {
  try {

    const result = await bulkDeleteProductService(req.body.ids);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        message: "Could not delete the product"
      })
    }

    res.status(200).json({
      status: "success",
      message: " Successfully delete the given product",


    })

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "could not delete the given product",
      error: error.message

    })

  }
}
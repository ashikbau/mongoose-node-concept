const Category = require("../models/Category");

exports.getCategoryService=async()=>{
    const category = await Category.find({});
    return category;
}
exports.createCategoryService=async(data)=>{
    const category = await Category.create(data);
    return category;
}
const { getCategoryService,createCategoryService } = require("../services/category.service");

exports.getCategory=async(req,res,next)=>{
    try {
        const category = await getCategoryService();
        
        res.status(200).json({
            status:"success",
            data:category
        })
        
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:"Can not get the Category",
            error:error.message
        })
    }
}
exports.createCategory=async(req,res,next)=>{
    try {
        const result = await createCategoryService(req.body);

        res.status(200).json({
            status:"success",
            message:"category created successfully",
            data:result
        })
        
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:"Can not create the category",
            error:error.message
        })
    }
}
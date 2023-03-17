const { createBrandService, getBrandService, getBrandByIdService, updateBrandService } = require("../services/brand.service")

exports.createBrand=async(req,res,next)=>{
try {
    const result = await createBrandService(req.body)

    res.status(200).json({
        status:"success",
        message:"successfully create the brand"

    })
} catch (error) {
    res.status(400).json({
        status:"fail",
        error:"Could not create the product"
    })
}
}

exports.getBrand=async(req,res,next)=>{
try {
    const brands = await getBrandService(req.body)

    res.status(200).json({
        status:"success",
       data: brands

    })
} catch (error) {
    res.status(400).json({
        status:"fail",
        error:"Could not get the brands"
    })
}
}

exports.getBrandById=async(req,res,next)=>{
try {
    const {id} = req.params;
    const brand = await getBrandByIdService(id);
    if(!brand){
        res.status(400).json({
            status:"fail",
            error:"Could not find brand with this id"
        })
    }

    res.status(200).json({
        status:"success",
       data: brand

    })
} catch (error) {
    res.status(400).json({
        status:"fail",
        error:"Could not get the brands"
    })
}
}
exports.updateBrand=async(req,res,next)=>{
try {
    const {id} = req.params;
    const result = await updateBrandService(id,req.body);
    if(!result.nModified){
        res.status(400).json({
            status:"fail",
            error:"Could not update brand with this id"
        })
    }

    res.status(200).json({
        status:"success",
       message:"Successfully updated the brand"
    })
} catch (error) {
    res.status(400).json({
        status:"fail",
        error:"Could not get the brands"
    })
}
}

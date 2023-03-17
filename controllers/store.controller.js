const { createStoreService, getStoresService, getStoreByIdService } = require("../services/store.service");

exports.getStores=async(req,res,next)=>{
    try {
        const stores = await getStoresService();
        
        res.status(200).json({
            status:"success",
            data:stores
        })
        
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:"Can not get the stores",
            error:error.message
        })
    }
}
exports.createStore=async(req,res,next)=>{
    try {
        const result = await createStoreService(req.body);

        res.status(200).json({
            status:"success",
            message:"Store created successfully",
            data:result
        })
        
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:"Can not create the store",
            error:error.message
        })
    }
}
exports.getStoreById=async(req,res,next)=>{
    const {id} = req.params;
    try {
        
        const store = await getStoreByIdService(id);

        res.status(200).json({
            status:"success",
            message:"Store created successfully",
            data:store
        })
        
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:"Can not store by this id",
            error:error.message
        })
    }
}
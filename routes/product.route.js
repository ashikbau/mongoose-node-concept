const express = require("express")
const router = express.Router();
const productController = require('../controllers/product.controller')


router
.route('/')
.get(productController.getProducts)
.post(productController.createProducts)
router
.route('/bulk-update')
.patch(productController.bulkUpdateProduct)

router
.route("/:id")
.patch(productController.updateProduct)



module.exports = router;
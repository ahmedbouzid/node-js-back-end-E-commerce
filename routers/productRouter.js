const router =require('express').Router()

const productController = require('../Controllers/productController')


const upload=require('../middleware/uploadFile')
const check_auth = require('../middleware/verify')

router.post('/create' , upload.array('galeries'), productController.create)
router.get('/', productController.getAll)
//router.put('/update/:id' ,productController.update )
router.delete('/delete/:id' , productController.delete)
router.get('/:id' , productController.getid)
router.put('/update/:id' ,upload.array('galeries'), productController.updateGallerie)

module.exports=router

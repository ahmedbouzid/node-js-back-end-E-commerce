const router = require('express').Router()
const costumerController = require('../Controllers/costumerControllers')

const upload=require('../middleware/uploadFile')


router.post('/registre' ,upload.array('image'), costumerController.registre)
router.get('/', costumerController.getAll)
router.get('/:id', costumerController.getId)

router.get('/getname', costumerController.getName)
router.put('/update/:id' , costumerController.update)
router.delete('/delete/:id' , costumerController.delete)
module.exports=router
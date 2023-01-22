const router = require('express').Router()

const orderController = require('../Controllers/orderController')

router.post('/create' , orderController.create)
router.get('/' , orderController.getAll)
router.put('/update/:id' , orderController.update)
router.delete('/delete/:id' , orderController.delete)
router.get('/:id' , orderController.getId)


module.exports = router
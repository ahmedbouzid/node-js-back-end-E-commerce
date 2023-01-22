const router = require('express').Router()
const providerController=require('../Controllers/providerController')

router.post('/register' , providerController.register)

router.get('/' , providerController.getAll)
router.put('/update/:id' , providerController.upadate)
router.delete('/delete/:id' , providerController.delete)
router.get('/:id' , providerController.getId)
router.get('/getName/' , providerController.getbyname)



module.exports= router
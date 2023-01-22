const router = require('express').Router()
const categorieController = require('../Controllers/categorieController')
const subCategorieController = require('../Controllers/subCategoryController')

const check_auth = require('../middleware/verify')


router.post('/create' , categorieController.create)
router.get('/',/* check_auth, */ categorieController.getAll)
router.put('/update/:id' , categorieController.upate)
router.delete('/delete/:id' , categorieController.delete)
router.get('/:id' , categorieController.getById)
//router.get('/:categorieId/subcategories' , subCategorieController.getByCategorie)

module.exports=router
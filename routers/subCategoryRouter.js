const router = require('express').Router()
const subCategorieController =require('../Controllers/subCategoryController')

router.post('/create' , subCategorieController.create)
router.get('/' , subCategorieController.getAll)
router.put('/update/:id' ,subCategorieController.update)
router.delete('/delete/:id' , subCategorieController.delete)
router.get('/getBy/:id' , subCategorieController.getId)
router.get('/getSubCatByCat' , subCategorieController.getSubByCategorie)

module.exports=router

const router = require('express').Router()
const verify= require('../middleware/verify')
const authContorller = require('../Controllers/authController')

router.post('/login', authContorller.login)
router.post('/adminregistre' , authContorller.registreAdmin)
router.get('/verifyNow/:verificationCode' , authContorller.verifyEmail )
router.post('/logout'  ,  authContorller.logout)
router.post('/refrechToken' , authContorller.verifyRefrechToken)
router.get('/profil' , verify , authContorller.profil)


module.exports=router
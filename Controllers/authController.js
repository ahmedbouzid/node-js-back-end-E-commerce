const userModel = require('../Models/UserModel')
const adminModel = require('../Models/adminModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


const refrech_token_secret = "some-secret-refresh-token-shit"
const verify = require('../middleware/verify')
const { join } = require('path')
//const User = require('../Models/UserModel')
let refreshTokens = []
//creation de token
JWT_SECRET = 'JWT_SECRET'
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "30m"
  })
}
//refresh token
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, refrech_token_secret, {
    expiresIn: "1h"
  })
}


module.exports = {
  registreAdmin: async (req, res) => {
    const salt = bcrypt.genSalt(10)
    const hash = await bcrypt.hashSync(req.body.password, parseInt(salt))
    const admin = new adminModel({
      ...req.body,
      password: hash,
      verifyUser: true,
      isAdmin: true
    })
    try {
      await admin.save(req.body, (err, item) => {

        if (err) {
          res.status(400).json({ succes: false, message: "Failed", err })
        } else {

          res.status(200).json({ succes: true, message: "succes", data: item })
        }

      })
    } catch (error) {
      console.log(error)
    }

  },
  login: async (req, res, next) => {
    const tokenList = {}
    try {
      const user = await userModel.findOne({ email: req.body.email })
      if (!user) return (createError(404, 'User not found'))
      const isPasswordCorecct = await bcrypt.compare(req.body.password, user.password)
      if (!isPasswordCorecct) return next((400, 'wrong Password'))
      const token = jwt.sign({ _id: user._id }, 'iamtryingtoaddsome')
      const refreshToken = jwt.sign({ _id: user._id }, "some-secret-refresh-token-shit", { expiresIn:  86400 })
      refreshTokens.push(refreshToken)
      const response = {
        "status": "Logged in",
        "token": token,
        "refreshToken": refreshToken,
      }
      tokenList[refreshToken] = response
     res.cookie("acces_token", token, {
        httpOnly: true,
      })
      res.status(200)
        .json({ message: "login succufully : email && Password are valide", data: { user, response } })
    } catch (error) {

      next(error)
    }

  },
  verifyEmail: async (req, res) => {
    try {
      const { verificationCode } = req.params
      const users = await UserModel.findOne({
        verificationCode,
      });
      users.verifyUser
      users.verificationCode = undefined
      users.save()
      return res.sendFile(join(__dirname, "../templates/succes.html"))

    } catch (error) {
      return res.sendFile(join(__dirname, "../templates/errors.html"))
    }
  },
  logout: (req,res)=>{
    const RefreshToken = req.body.token;
    refreshTokens=refreshTokens.filter(()=> token !== RefreshToken)
    res.status(200).json({message:"you logged out"})
  },

  verifyRefrechToken: (req, res) => {
    const RefreshToken = req.body.token
    if (!refreshTokens.includes(RefreshToken))
      return res.status(403).json('refrech token is not valid')

    jwt.verify(RefreshToken, refrech_token_secret, (err, user) => {
      refreshTokens = refreshTokens.filter((token) => token !== RefreshToken)
      const newAcessToken = generateAccessToken(RefreshToken)
      const newRefrechToken = generateRefreshToken(RefreshToken)
      refreshTokens.push(newRefrechToken)
      res.status(200)
        .json({ token: newAcessToken, refreshToken: newRefrechToken })
    })

  },
  profil : async(req , res)=>{
    try {
      const user = req.user
      res
      .status(200)
      .json({user : user , message:"success"})
    } catch (error) {
      res
      .status(400)
      .json({user: error , message:"error"})
      
    }
  }


}

const multer = require("multer")
const Storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './storages') //cb callback pour rappeler et renvoyer une erreur ou une valeur ou les deux dans certains cas

    },
    filename: function(req, file, cb) {
         const images = Date.now() + '-' + file.originalname
          cb(null, file.fieldname + Date.now() + images)
    }
})
const upload = multer({
    storage: Storage,
    limits: { _fileSize: 1024 * 1024 * 1024 * 10 },
     fileFilter: function(req, file, cb) {
        if (file.mimetype === "image/jpg"  ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png"  ||
            file.mimetype === "image/jfif" ||
            file.mimetype === "video/mp4"  ||
            "application/pdf") {
            cb(null, true)
        } else {
            cb(new Error("Image uploaded is not of type jpg/jpeg/png or jfif.....", false))
        }
    }
})
module.exports = upload
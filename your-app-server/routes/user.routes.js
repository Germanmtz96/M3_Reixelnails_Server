const router = require("express").Router();
const {tokenValidation, adminValidation} = require("../middlewares/auth.middlewares");
const User = require("../models/User.model")



// GET "/api/users" => el usuario ve su propio perfil

router.get("/", tokenValidation, async (req, res, next) => {
  
    try {
      
      const response = await User.findById(req.payload._id)
      res.json(response)
  
    } catch (error) {
      next(error)
    }
  
  
  })
  


// PATCH "/api/users/userId" => el usuario actualiza su tlf en el perfil

router.patch("/:userId/tlf", async (req, res, next) => {

    try {
      
      const response = await User.findByIdAndUpdate(req.params.userId, {
        tlf: req.body.tlf
      }, {new:true})
      res.status(200).json(response)
  
    } catch (error) {
      console.log(error)
      next(error)
    }
  
  })



// DELETE "/api/users/userId" => el usuario borra su cuenta

router.delete("/:userId", async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.userId)
      res.sendStatus(202)
    } catch (error) {
      next(error)
    }
  })


//GET "api/users/admin" => el admin ve esta pantalla

router.get("/admin", tokenValidation, adminValidation, (req, res, next) => {
    console.log("Esta ruta solo es accesible para usuario logeados y de tipo admin")
  })


module.exports = router
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
  


// PATCH "/api/users/:userId/tlf" => el usuario actualiza su tlf en el perfil

router.patch("/propio/tlf", tokenValidation, async (req, res, next) => {
    const { tlf } = req.body
    const telefonoRegex = /^\d{9}$/g
    if(telefonoRegex.test(tlf)=== false){
      res.status(400).json({errorMessage: "Solo puede tener números y 9 cifras."})
      return
    }


    try {
      
      const response = await User.findByIdAndUpdate(req.payload._id, {
        tlf: req.body.tlf
      }, {new:true})
      res.status(200).json(response)
  
    } catch (error) {
      console.log(error)
      next(error)
    }
  
  })



// DELETE "/api/users/:userId" => el usuario borra su cuenta

router.delete("/", tokenValidation, async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.payload._id)
      res.sendStatus(202)
    } catch (error) {
      next(error)
    }
  })

// DELETE "/api/users/:userId" => el admin borra cualquier cuenta
router.delete("/:userId/admin", tokenValidation, adminValidation, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userId)
    res.sendStatus(202)
  } catch (error) {
    next(error)
  }
})

//GET "api/users/admin" => el admin ve esta pantalla de todos los usuarios

 router.get("/admin", tokenValidation, adminValidation, async (req, res, next) => {
  try {
      
    const response = await User.find()
    res.json(response)

  } catch (error) {
    next(error)
  }
  })
 

module.exports = router
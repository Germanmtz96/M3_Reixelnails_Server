const router = require("express").Router();
const {tokenValidation, adminValidation} = require("../middlewares/auth.middlewares");
const Publicacion = require("../models/Publicacion.model")

// GET "/api/publicaciones" => el usuario ve las publicaciones

router.get("/", async (req, res, next) => {
  
    try {
      
      const response = await User.find()
      res.json(response)
  
    } catch (error) {
      next(error)
    }
  
  
  })
  

// POST "/api/publicaciones" => el admin crea una nueva publicacion

router.post("/", adminValidation, async (req, res, next) => {
  
    try {
      
        const {titulo,likes,comentarios,imagen} = req.body

      await Publicacion.create({
        titulo,
        likes,
        comentarios,
        imagen
      })
      res.sendStatus(201)

    } catch (error) {
      next(error)
    }
  
  
  })

// DELETE "/api/publicaciones/:publicacionId" => el admin elimina una publicacion

router.delete("/:publicacionId", adminValidation, async (req, res, next) => {
    try {
      await Publicacion.findByIdAndDelete(req.params.publicacionId)
      res.sendStatus(202)
    } catch (error) {
      next(error)
    }
  })

// GET "/api/publicaciones/:publicacionId" => el usuario ve los detalles de una publicacion

router.get("/:publicacionId", tokenValidation, async (req, res, next) => {
  
    try {
      
      const response = await User.findById(req.params.publicacionId)
      res.json(response)
  
    } catch (error) {
      next(error)
    }
  
  
  })

// PATCH "/api/publicaciones/:publicacionId" => el usuario actualiza el boton de like

router.patch("/:publicacionId", tokenValidation, async (req, res, next) => {

    try {
      
      const response = await Publicacion.findById(req.params.publicacionId)
      await Publicacion.findByIdAndUpdate(req.params.publicacionId, {
        likes: !response.likes
      }, {new:true})
      res.sendStatus(202)
  
    } catch (error) {
      console.log(error)
    }
  
  })

// PATCH "/api/publicaciones/:publicacionId" => el admin edita el titulo de la publicacion

router.patch("/:publicacionId", adminValidation, async (req, res, next) => {

    try {
      
      await Publicacion.findByIdAndUpdate(req.params.publicacionId, {
        titulo: req.body.titulo
      }, {new:true})
      res.sendStatus(202)
  
    } catch (error) {
      console.log(error)
    }
  
  })



module.exports = router
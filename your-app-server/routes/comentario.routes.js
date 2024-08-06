const router = require("express").Router();
const {tokenValidation, adminValidation} = require("../middlewares/auth.middlewares");
const Comentario = require("../models/Comentario.model")

// POST "/api/comentarios" => el usuario crea un comentario

router.post("/", tokenValidation, async (req, res, next) => {
  
    try {
        const {descripcion,creator} = req.body

      await Comentario.create({
        descripcion,
        creator
      })
      res.sendStatus(201)

    } catch (error) {
      next(error)
    }
  
  
  })

// PATCH "/api/comentarios/:comentarioId" => el usuario edita un comentario suyo

router.patch("/:comentarioId", tokenValidation, async (req, res, next) => {
      
        try {
            await Comentario.findByIdAndUpdate(req.params.comentarioId, {
                descripcion: req.body.descripcion
            }, {new:true})
            res.sendStatus(202)
        
          } catch (error) {
            console.log(error)
          }
        
        })

// DELETE "/api/comentarios/:comentarioId" => el usuario borra un comentario suyo

router.delete("/:comentarioId", tokenValidation, async (req, res, next) => {
    try {
      await Comentario.findByIdAndDelete(req.params.comentarioId)
      res.sendStatus(202)
    } catch (error) {
      next(error)
    }
  })

  module.exports = router
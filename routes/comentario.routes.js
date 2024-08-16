const router = require("express").Router();
const {tokenValidation, adminValidation} = require("../middlewares/auth.middlewares");
const Comentario = require("../models/Comentario.model");
const Publicacion = require("../models/Publicacion.model");


// GET "/api/comentarios/:publicacionId" => el usuario ve los comentario
router.get("/:publicacionId", tokenValidation, async (req, res, next) => {
try {
  const { publicacionId } = req.params
  const response = await Comentario.find({ publicacion: publicacionId }).populate('publicacion').populate('creator')
      res.json(response)
} catch (error) {
  next(error)
}
})

// POST "/api/comentarios/:publicacionId" => el usuario crea un comentario

router.post("/:publicacionId", tokenValidation, async (req, res, next) => {
  
    try {
        const {descripcion} = req.body

        const publicacion = await Publicacion.findById(req.params.publicacionId);
        if (!publicacion) {
          return res.status(404).json({ message: "Publicación no encontrada" });
        }

        await Comentario.create({
          descripcion,
          creator : req.payload._id,
          publicacion : req.params.publicacionId
        })

      
        await Comentario.findById(req.params.comentarioId).populate('publicacion');

        res.sendStatus(202)

    } catch (error) {
      next(error)
    }
  
  
  })

// PATCH "/api/comentarios/:comentarioId" => el usuario edita un comentario suyo

router.patch("/:comentarioId", tokenValidation, async (req, res, next) => {
      
        try {
          if(req.body.creator === req.payload._id || req.payload.role === "admin"){
            await Comentario.findByIdAndUpdate(req.params.comentarioId, {
                descripcion: req.body.descripcion
            }, {new:true})
            res.sendStatus(202)
          }else{
            return res.status(404).json({ message: "No tienes permisos para editar este comentario." })
          }
        
          } catch (error) {
            console.log(error)
          }
        
        })

// DELETE "/api/comentarios/:comentarioId" => el usuario borra un comentario suyo

router.delete("/:comentarioId", tokenValidation, async (req, res, next) => {

  const {comentarioId} = req.params

  const comentario = await Comentario.findById(comentarioId)

    try {
      if(comentario.creator.equals(req.payload._id) || req.payload.role === "admin"){
      await Comentario.findByIdAndDelete(req.params.comentarioId)
      
      res.sendStatus(202)
    }else{
      return res.status(404).json({ message: "No tienes permisos para borrar este comentario." })
    }


    } catch (error) {
      next(error)
    }
  })

  module.exports = router
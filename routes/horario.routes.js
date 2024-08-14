const router = require("express").Router();
const {tokenValidation, adminValidation} = require("../middlewares/auth.middlewares");
const Horario = require("../models/Horario.model");

// GET "/api/horarios" => el usuario ve los horarios

router.get("/", tokenValidation, async (req, res, next) => {
  
    try {
        
        const response = await Horario.find().populate('cliente')
        res.json(response)

    } catch (error) {
      next(error)
    }
  
  
  })

// POST "/api/horarios" => el admin crea un horario

router.post("/", tokenValidation, adminValidation, async (req, res, next) => {
  
    try {
        const {day,horaStart} = req.body

      await Horario.create({
        day,
        horaStart,
      })
      res.sendStatus(201)

    } catch (error) {
      next(error)
    }
  
  
  })

// PATCH "/api/horarios/:horarioId" => el admin edita un horario

router.patch("/:horarioId", tokenValidation, adminValidation, async (req, res, next) => {
      
        try {
            await Horario.findByIdAndUpdate(req.params.horarioId, {
                horaStart: req.body.horaStart
            }, {new:true})
            
        
          } catch (error) {
            console.log(error)
          }
        
        })

// DELETE "/api/horarios/:horarioId" => el admin borra un horario

router.delete("/:horarioId", tokenValidation, adminValidation, async (req, res, next) => {
    try {
      await Horario.findByIdAndDelete(req.params.horarioId)
      res.sendStatus(202)
    } catch (error) {
      next(error)
    }
  })


  // PATCH "/api/horarios/:horarioId/coger_cita => El usuario se añade a un horario de cita

  router.patch("/:horarioId/coger_cita", tokenValidation, async (req, res, next) => {
    
    try {
      await Horario.findByIdAndUpdate(req.params.horarioId, {

        servicio: req.body.servicio,
        cliente: req.payload._id

      })
      const horarioInfo = await Horario.findById(req.params.horarioId).populate("cliente")
      res.status(200).json(horarioInfo)

    } catch (error) {
      next(error)
    }
  })


  //PATCH "/api/horarios/:horarioId/quitar_cita" => El usuario se quita de un horario de cita

  router.patch("/:horarioId/quitar_cita", tokenValidation, async (req, res, next) => {
    
    try {
      const response = await Horario.findById(req.params.horarioId)

       if(response.cliente === req.payload._id || req.payload.role === "admin"){ 

        await Horario.findByIdAndUpdate(req.params.horarioId, {
  
          servicio : null,
          cliente : null
  
        })
        res.status(202).json({ message: "La cancelación de la cita fue exitosa."})
 
      }else {
        res.status(403).json({ message: "No tienes permiso para cancelar esta cita." });
        }
 
    } catch (error) {
      next(error)
    }
  })

  module.exports = router
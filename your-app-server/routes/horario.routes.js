const router = require("express").Router();
const {tokenValidation, adminValidation} = require("../middlewares/auth.middlewares");
const Horario = require("../models/Horario.model");

// GET "/api/horarios" => el usuario ve los horarios

router.get("/", tokenValidation, async (req, res, next) => {
  
    try {
        
        const response = await Horario.find()
        res.json(response)

    } catch (error) {
      next(error)
    }
  
  
  })

// POST "/api/horarios" => el admin crea un horario

router.post("/", tokenValidation, adminValidation, async (req, res, next) => {
  
    try {
        const {day,horaStart,cliente,servicio} = req.body

      await Horario.create({
        day,
        horaStart,
        cliente,
        servicio
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
            res.sendStatus(202)
        
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

  module.exports = router
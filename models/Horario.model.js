const {Schema, model} = require("mongoose")

const horarioSchema = new Schema({
    day: {
    type: Date,
    required: true,
  },
  horaStart: {
    type: String,
    required: true
  },
  servicio: {
    type: String, 
    enum: ["Semi", "Acrilico","Pedicura", "Pack"]
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref:'User'
   }
})



const Horario = model( "Horario", horarioSchema )

module.exports = Horario
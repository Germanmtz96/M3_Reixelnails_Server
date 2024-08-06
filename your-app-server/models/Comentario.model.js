const mongoose = require("mongoose")

const comentarioSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref:'User'
}
})



const Comentario = mongoose.model( "Comentario", comentarioSchema )

module.exports = Comentario
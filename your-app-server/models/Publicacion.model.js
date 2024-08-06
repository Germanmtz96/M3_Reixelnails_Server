const {Schema, model} = require("mongoose")

const publicacionSchema = new Schema({
    titulo: {
    type: String,
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId], 
    ref:'User'
},
  comentarios: {
    type: [Schema.Types.ObjectId],
    ref:'Comentario' 
},
imagen :{ 
    type: String, 
    required: true
}
})



const Publicacion = model( "Publicacion", publicacionSchema )

module.exports = Publicacion
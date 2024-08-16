# Reixelnails

## [See the App!](https://github.com/Germanmtz96)

![App Logo](https://imgur.com/2WqrE7w)

## Description

Un proyecto de página web para un salón de uñas donde los usuarios registrados pueden agendar citas en horarios establecidos por el administrador, interactuar con publicaciones mediante comentarios y "me gusta", y disfrutar de contenido exclusivo, todo gestionado eficientemente por un administrador.
#### [Client Repo here](https://github.com/Germanmtz96/M3_webnails)
#### [Server Repo here](https://github.com/Germanmtz96/M3_Reixelnails_Server)

# Server Structure

## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  tlf: { type: Number, required: true},
  nombreCompleto:{type: String,required: [true, 'El nombre es obligatorio.']},
  role: { type: String, enum: ["user", "admin"], default "user" }
}
```

Horario model

```javascript
 {
   day: { type: Date},
   horaStart:{ type: String},
   servicio: { type: String, enum: ["Semi", "Acrilico","Pedicura", "Pack"]},
   cliente: {type: Schema.Types.ObjectId,ref:'User'}
 }
```

Comentario model

```javascript
 {
   descripcion: {type: String, required: true},
   creator: {type: Schema.Types.ObjectId,ref:'User'},
   publicacion : {type: Schema.Types.ObjectId,ref:'Publicacion'}
 }
```

Publicacion model

```javascript
 {
   titulo: {type: String, required: true},
   likes: {type: [Schema.Types.ObjectId], ref:'User'},
   imagen :{ type: String, required: true}
 }
```

## API Endpoints (backend routes)

| HTTP Method | URL                             | Request Body                 | Success status | Error Status | Description                                                    |
| ----------- | ------------------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| GET         | `/api/horarios`                  |                              | 200            | 400          | Devuelve un Array de todos los horarios                        |
| POST        | `/api/horarios`                  |{dia, horaStart, servicio}    | 201            | 400          | Crear un nuevo horario                                         |
| PUT         | `/api/horarios/:horarioId`        |{dia, horaStart, servicio}    | 200            | 401          | Actualiza todos los datos del horario                          |
| DELETE      | `/api/horarios/:horarioId`        |                              | 204            | 400          | Borra un horario                                               |
| GET         | `/api/publicaciones`              |                              | 200            | 400          | Devuelve un Array de Objetos con cada Publicacion              |
| POST        | `/api/publicaciones`              |{titulo,like,comentarios,img} | 201            | 400          | Crear una nueva Publicacion                                    |
| DELETE      | `/api/publicaciones/:publicacionId`|                              | 204            | 401          | Borra una Publicación                                          |
| GET         | `/api/publicaciones/:publicacionId`|                              | 200            | 400          | Devuelve el Objeto de la Publicacion                           |
| POST        | `/api/comentarios`               |{descripción}                 | 201            | 400          | Crear un nuevo comentario                                      |
| PATCH       | `/api/comentarios/:comentarioId`  |{descripción}                 | 200            | 400          | Editar solo la descripción del comentario                      |
| DELETE      | `/api/comentarios/:comentarioId`  |                              | 204            | 401          | Borrar un comentario                                           |
| PATCH       | `/api/publicaciones/:publicacionId`|{like}                        | 200            | 400          | Editar si le das a like o no                                   |
| PATCH       | `/api/publicaciones/:publicacionId`|{titulo}                      | 200            | 400          | Editar el titulo de la Publicacion                             |
| GET         | `/api/users`                    |                              | 200            | 400          | Devuelve un Array con todos los usuarios                       |
| POST        | `/api/users`                    |{username,email,password,tlf} | 201            | 400          | Crea un nuevo usuario                                          |
| PATCH       | `/api/users/:userId`             |{tlf}                         | 200            | 400          | Edita el telefono de un usuario                                |
| DELETE      | `/api/users/:userId`             |                              | 204            | 400          | Borra un usuario                                               |
| POST        | `/api/auth/signup`              |                              | 204            | 400          | Crea un usuario                                                |
| POST        | `/api/auth/login`               |                              | 204            | 400          | Autentifica un usuario y da un token                           |
| GET         | `/api/auth/verify`              |                              | 204            | 400          | Verifica si el token es valido                                 |
  
## Links

### Collaborators

[Germán Martínez](https://github.com/Germanmtz96)

### Project

[Repository Link Client](https://github.com/Germanmtz96/M3_webnails)

[Repository Link Server](https://github.com/Germanmtz96/M3_Reixelnails_Server)

[Deploy Link](https://reixelnails.netlify.app)

### Slides

[Slides Link](https://www.canva.com/design/DAGOAXFj4og/ysvbmpIM6mJZMuEWUzsFKA/view?utm_content=DAGOAXFj4og&utm_campaign=designshare&utm_medium=link&utm_source=editor)

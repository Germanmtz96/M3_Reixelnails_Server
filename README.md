NOTE: to copy this readme structure simply click on `Raw` on the top right of this gist. There you have the content in the basic [Markdown syntax](https://www.markdownguide.org/basic-syntax/) used in readme files. Then paste it on a README.md file in your repository and fill the information. Always do this directly from VS code, not from github. DON'T ADD THIS NOTE TO YOUR README. Also make sure to remove any notes from this template.

# Reixelnails

## [See the App!](www.your-deploy-url-here.com)

![App Logo](your-image-logo-path-or-name)

## Description

**NOTE -** Describe your project in one/two lines.

#### [Client Repo here](www.your-github-url-here.com)
#### [Server Repo here](www.your-github-url-here.com)

## Backlog Functionalities

**NOTE -** List here all functionalities you wish to add to your proyect later or that you are currently working on

## Technologies used

**NOTE -** List here all technologies used in the project like HTML, CSS, Javascript, Express, React, axios, React Context etc.

# Server Structure

## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  tlf: { type: Number, required: true}
}
```

Horario model

```javascript
 {
   day: { type: Date},
   hora-start{ type: String},
   hora-end{ type: String},
 }
```

Comentario model

```javascript
 {
   descripcion: {type: String, required: true},
   creator: {type: Schema.Types.ObjectId,ref:'User'},
 }
```

Cita model

```javascript
 {
   hueco-libre: {type: mongoose.Schema.Types.ObjectId,ref: 'Horarios', required: true},
   creator: {type: Schema.Types.ObjectId,ref:'User'},
 }
```

Publicacion model

```javascript
 {
   titulo: {type: String, required: true},
   like: {type: Number, default:0, type: Schema.Types.ObjectId ,ref:'User'},
   comentarios: {type:[String], type: Schema.Types.ObjectId,ref:'User'},
   imagen{ type: String, required: true}
 }
```

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                    |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| GET         | `/horario`                  |                              | 200            | 400          | Devuelve un Array de todos los horarios                        |
| POST        | `/horario`                  |{dia, hora-start, hora-end}   | 201            | 400          | Crear un nuevo horario                                         |
| PUT         | `/horario`                  |{dia, hora-start, hora-end}   | 200            | 401          | Actualiza todos los datos del horario                          |
| DELETE      | `/horario`                  |                              | 200            | 400          | Borra un horario                                               |
| GET         | `/publicacion`              |                              | 200            | 400          | Devuelve un Array de Objetos con cada Publicacion              |
| POST        | `/publicacion`              |{titulo,like,comentarios,img} | 201            | 400          | Crear una nueva Publicacion                                    |
| DELETE      | `/publicacion/publicacionId`|                              | 200            | 401          | Borra una Publicación                                          |
| GET         | `/publicacion/publicacionId`|                              | 200            | 400          | Devuelve el Objeto de la Publicacion                           |
| POST        | `/comentario`               |{descripción}                 | 201            | 400          | Crear un nuevo comentario                                      |
| PATCH       | `/comentario/comentarioId`  |{descripción}                 | 200            | 400          | Editar solo la descripción del comentario                      |
| DELETE      | `/comentario/comentarioId`  |                              | 200            | 401          | Borrar un comentario                                           |
| PATCH       | `/publicacion/publicacionId`|{like}                        | 200            | 400          | Editar si le das a like o no                                   |
| PATCH       | `/publicacion/publicacionId`|{titulo}                      | 200            | 400          | Editar el titulo de la Publicacion                             |
| GET         | `/users`                    |                              | 200            | 400          | Devuelve un Array con todos los usuarios                       |
| POST        | `/users`                    |{username,email,password,tlf} | 201            | 400          | Crea un nuevo usuario                                          |
| PATCH       | `/users/userId`             |{tlf}                         | 200            | 400          | Edita el telefono de un usuario                                |
| DELETE      | `/users/userId`             |                              | 200            | 400          | Borra un usuario                                               |
  
## Links

### Collaborators

[Germán Martínez](https://github.com/Germanmtz96)

### Project

[Repository Link Client](www.your-github-url-here.com)

[Repository Link Server](www.your-github-url-here.com)

[Deploy Link](www.your-deploy-url-here.com)

### Slides

[Slides Link](www.your-slides-url-here.com)

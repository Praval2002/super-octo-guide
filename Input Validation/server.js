const express = require('express');
const app = express() ;
const port = 3000;
const path = require ('path');
const bodyParser =require('body-parser');
const {check,validationResult}= require('express-validator'); 

let urlencoded =bodyParser.urlencoded({extended: false});

app.use(bodyParser.json());

app.use(express.static(__dirname +'/public' ))
  app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/index.html'))
    });
    app.post('/formData', [
     // check('name')
      //.not().isEmpty() .withMessage('Name cannot be empty.')
      //.isLength({
       // min:3
      //}) .withMessage(' Name has to be at-least 3 characters.')
      //.isAlpha().withMessage('Name cannot contain numbers or special characters')
      
      check('email', 'Email is not valid')
      .isEmail()
      ]  , (request,response) => {
      console.log(request.body.name )
      const errors =validationResult(request);

      if(!errors.isEmpty()) {
        return response.status(422).json({
        errors:errors.array() 
      });  
      }
      response.status(202).json({
        success:'ok'
      })
    })
    app.listen(port, () => console.log('server running'));
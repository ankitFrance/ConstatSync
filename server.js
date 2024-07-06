const express = require('express');
const app = express();
const  mongoose  = require("mongoose");




app.set('view engine', 'ejs');
app.use(express.static('public'));  // for css and javascript


    
            
app.use(express.urlencoded({extended: false}))   //help to use the form data

app.use('/', require('./routes/indexRoute'))


// ***********************************DATABASE CONNECTION********************************************
//mongoose.connect("mongodb://127.0.0.1:27017/ConstatDetat", {useNewUrlParser: true});
mongoose.connect("mongodb://127.0.0.1:27017/GestDeUtil", {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', ()=>{
    console.log('something went wrong')
})

db.once( 'open', ()=>{
    console.log('connected sucessfully')
});




// ***********************************DATABASE CONNECTION END ********************************************

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});






/* Daouda code 

const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));  // for css and javascript
app.use(express.urlencoded({extended: false}))   //help to use the form data
app.use('/', require('./routes/indexRoute'))
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/GestDeUtil';
// Connexion à MongoDB
mongoose.connect(mongoUri).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});
// Configuration de l'application
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// Démarrage du serveur
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

*/

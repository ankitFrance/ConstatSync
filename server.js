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
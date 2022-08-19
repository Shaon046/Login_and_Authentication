const express=require('express');
const mongoose=require('mongoose');
const config=require('./config.json')
const bodyParser=require('body-parser');
const homeRouter=require('./routes/homeRouter')
const loginRouter=require('./routes/loginRouter')


const app=express()
const port=config.port;

mongoose.connect(config.mongoDBURL)
.then(console.log("DB connected....."))
.catch((err)=>console.log("DB is NOT connceted....."))





app.set('view engine','ejs')
app.use(express.json())
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/jso
app.use(bodyParser.json())


app.use(homeRouter)
app.use(loginRouter)

app.listen(port,(error)=>{
    if(error){
        console.log("server is NOT live");
    }else{console.log("server is running at ",config.port)}
})
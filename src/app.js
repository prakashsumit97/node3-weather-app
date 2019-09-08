const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

console.log(__dirname);
console.log(path.join(__dirname,'../public/index.html'));

// Define paths for Express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');
const port = process.env.PORT||3000;


// set up handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

// setup static directory to serve
app.use(express.static(publicDirectory))


app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Sumit Prakash"
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Weather App",
        name:"Sumit Prakash"
    });
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Me",
        name:"Sumit Prakash"
    });
})


app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error:'You must provide an address.'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,foreCastData)=>{
            if(error){
                return res.send(error);
            }
            res.send({
                forecast:foreCastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('helpError',{
        title:"Help Error Page",
        name:"sumit PRakash",
        errorMessage:"Help Page not found"
    });
 })

app.get('*',(req,res)=>{
    res.render('error',{
        title:"404",
        name:"sumit PRakash",
        errorMessage:"Page Not Found"
    });
})

app.listen(port,()=>{
    console.log(`server is up in port ${port}`);
})
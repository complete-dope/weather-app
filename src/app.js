const path = require('path'); // Path Library of NodejS
const express= require('express');//express is a function
const res = require('express/lib/response');
const hbs = require("hbs")
const forecastList = require("./utils/forecast.js");
// we call it to create a new express server

const app =express();
const viewsPath = path.join(__dirname  ,"../templates/views" )
const publicDirectoryPath = path.join(__dirname , '../public')
const partialsPath = path.join(__dirname , '../templates/partials')

const request = require("request")

function apilocation(location){
    const url = "https://api.weatherapi.com/v1/current.json?key=4af4dda2afeb4dfab5d81100221202&q=" + encodeURIComponent(location) + "&aqi=yes";
    request({url:url , json:true} , (error , response)=>{
        console.log(response.body.current.temp_c);
        var b = response.body.current.temp_c
        console.log(b);
        return b;
    })
}



// app.set() 
app.set('view engine','hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

// app.use() customises server
// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Routes
app.get('/' ,(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:"Elon"
    })
})

app.get('/weather' ,(req,res)=>{
    if(!req.query.address){
        return res.send({error:"Please enter a search query"})
    }
    const location =req.query.address;
    const url = "https://api.weatherapi.com/v1/current.json?key=4af4dda2afeb4dfab5d81100221202&q=" + encodeURIComponent(location) + "&aqi=yes";
    request({url:url , json:true} , (error , response)=>{
        if(error){
            return res.send("this file cant be sent")
        }
        var text = response.body.current.condition.text // this gives MIST
        var humidity =response.body.current.humidity // this gives 32
        var feelslike_c = response.body.current.feelslike_c // feels like temp
        var aqi =response.body.current.air_quality.pm2_5 // this gives 107.45
        var temp_c = response.body.current.temp_c
        
        res.render('weather',{
            temp_c:temp_c,
            location:req.query.address,
            condition:text,
            humidity:humidity,
            feelslike_c:feelslike_c,
            aqi:aqi
        })
    })
    
})
// app.com -->express server
// app.com/help --> routes

app.get('/help' , (req,res)=>{
    res.render('help');
})


// the values from query strings comes to the request var of the app get 
app.get('/products', (req,res)=>{
    if(!req.query.product){
        return res.send("You must provide a search term ")
    }
    console.log(req.query.product)
    res.send("Request for query")
    // http is a 2 way protocol a request is send and then a response is send back to us and this way we say it to be a 2 way connection only one time a req and one time a res is send back then aagain req and then res
    
})

app.get('/about' ,(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Elon"
    })
    // here title and name are the props that we pass to the (similar to the one we used in the react application)
})

app.get('/help/*' , (req,res)=>{
    res.render('error',{
        title:"Help article not found"
    })
})

// This needs to come at the last always . Express will match line wise and will come to last as we say * everything is a match.
app.get('*',(req,res)=>{
    res.render("error",{
        title:"Page not found"
    })
})

app.listen(5000 ,()=>{
    console.log("server is up at port " + 5000);
});
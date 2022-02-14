const request = require("request")

function apilocation(location){
    const url = "https://api.weatherapi.com/v1/current.json?key=4af4dda2afeb4dfab5d81100221202&q=" + encodeURIComponent(location) + "&aqi=yes";
    request({url:url , json:true} , (error , response)=>{
        console.log(response.body.current.temp_c);
        var b = response.body.current.temp_c
        console.log(b);
        return {
            temperature:b
        }
    })
}

module.exports ={
    apilocation:apilocation
}
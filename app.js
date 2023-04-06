const express=require("express");

const https=require("https");

const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
    const query=req.body.cityName
    const apiKey="041bb71d0c514416c851e5fe998e4a51";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units+""
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp= weatherData.main.temp;
            const icon=weatherData.weather[0].icon;
            const place=weatherData.name;
            const iconUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            const weatherDescription=weatherData.weather[0].description;
        
            res.write("<h1>The weather is currently "+weatherDescription+"<h1><br>")
            res.write("<h2>The temperature in "+place+" is: "+temp+"degrees celsius</h2>")
            res.write('<img src="'+iconUrl+'"><br>');
            res.send();
        })
    })
})  

app.listen(3000, function(){
    console.log("server started");
})
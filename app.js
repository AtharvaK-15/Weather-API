const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apiKey = config.apikey;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url,function(response){
     response.on("data",function(data){
        const json = JSON.parse(data);
        const temp = json.weather[0].description;
        const temperature = json.main.temp;
        const icon = json.weather[0].icon;
        const image =  " http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<html><h3>The weather is currently "+temp +".</h3></html>");
        res.write("<h1>The temperature in "+query+" currently is "+temperature+" degree Celcius</h1>");
        res.write("<img src="+image+">");
        res.send();
    })
});

})

// process.env.port for heroku working
app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000.");
})
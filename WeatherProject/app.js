const { json } = require("express")
const express = require("express")
const https = require("https")

const app = express()

app.use(express.urlencoded({extended: true}))

app.get("/", function(req, res) {
   res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
    
const query = req.body.cityName
const apiKey = ""
const unit = "metric"
const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`

https.get(url, function(response) { // response corresponde à URL
   console.log(response.statusCode)

   response.on("data", function(data) {
       const weatherData = JSON.parse(data)
       const temp = weatherData.main.temp
       const weatherDescription = weatherData.weather[0].description
       const icon = weatherData.weather[0].icon
       const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
       console.log(weatherDescription)
       res.write("<h1> Te weather is currently " + weatherDescription)
       res.write(`<br/>The temperature in ${query} is ${temp} degrees Celsius</h1>`) 
       res.write(`<img src="${imageURL}"/>`)      
       res.send()
   })
})
})



app.listen(3000, function() {
    console.log("Server is running on port 3000")
})
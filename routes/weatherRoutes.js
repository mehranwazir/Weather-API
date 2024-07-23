// routes/weatherRoutes.js

const express = require('express');
const Weather = require('../models/Weather');
const axios = require("axios"); // For handling https requests. We can also use https which is built in.
const router = express.Router();


apiKey = process.env.API_KEY



  
router.get('',(req,res)=>{
    res.json({message: "Hi, This is a Weather App"})
})


router.get('/weather', async (req, res) => {
    
    const city = req.query.city;

    if (!city)
    {
        return res.status(400).json({ message: "Please provide a city name. Use the endpoint /weather?city={city_name} to get weather information." }); // 400 client error
    }
    //const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" + apiKey + "&units=metric"
    try {


        const response =await axios.get(url);
        
        const weather2 = response.data;        

        const weatherData = new Weather({
            city: weather2.name,
            temperature: weather2.main.temp,
            description: weather2.weather[0].description,
            timestamp: new Date()
        })

        //console.log(weatherData)
  
         weatherData.save();

      


      res.json({
        city: weather2.name,
        temperature: weather2.main.temp,
        description: weather2.weather[0].description
      })

    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data.message });
        } else {
            res.status(500).json({ error: 'Error fetching the weather data. Please try again' });
        }
    }
});


// Catch-all route for undefined endpoints
router.get("*", (req, res) => {
    res.status(404).send("Page Not Found"); // 404 not found error
});


module.exports = router;

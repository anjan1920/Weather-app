document.addEventListener('DOMContentLoaded',()=>{
    console.log("JS working");
    
    //grab the search btn 
    const search_btn = document.getElementById('search_btn')
    //grab the text input
    const city_input = document.getElementById('city_input')


    //grab loader
    const loader = document.getElementById('loader')


    const API_KEY = "086573b145de709bc07cd17f9f47a4bc"
    let api_url = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'


    //lets print the city name  while click 
    search_btn.addEventListener('click',async()=>{
        // console.log('Search btn clicked');

        let city_name = city_input.value.trim()
        //console.log(city_name);
        if(!city_name) return;

        //show loader
        loader.classList.remove('hidden')

        //clear previous result
        clearDisplay()


        //fetch weather data of the city
        //server may throw the error so bind the api request in try cacth block
        try {
            const  weatherData = await fetch_weatherData(city_name);//await need to access the async function
            display_weatherData(weatherData)
            
        } catch (error) {
            console.log("error from get_weather_btn",error);
            showError()
        }

        //hide loader
        loader.classList.add('hidden')

        //clear input
        city_input.value = ""
        
        
    })


     //must be a async function 
    async function fetch_weatherData(city){
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        try{
            const response = await fetch(url)
            
            if(response.ok != true){
                throw new Error(`response status`)
            }
            //console.log("Type of response",typeof(response));
            //console.log(response);
            const data = await response.json();
           // console.log(data);
            return data;
    
        }catch(err){
            console.log("ERROR !!",err);
            throw err
            
        }

    }


    function display_weatherData(city){
        //console.log("Displaying the data from display_weatherData function ",city);
        document.getElementById('error_message').classList.add('hidden')
        document.getElementById('display').classList.remove('hidden')

        
       
        const {name,main,weather,wind} = city;
        console.log("wind",(wind.speed*3.67),"humidity",main.humidity);
        
        //console.log(main);
        
         //console.log(weather[0].description);
         const weather_icon = document.getElementById("weather_icon");

        if(weather[0].description === 'clear sky'){
            //change the image
            weather_icon.src = "./images/clear.png";         
            weather_icon.classList.remove("hidden");       
        }else if(weather[0].description === 'overcast clouds'){
            weather_icon.src = "./images/clouds.png";         
            weather_icon.classList.remove("hidden");

        }else if(weather[0].description === 'broken clouds' || weather[0].description=='light rain'){
            weather_icon.src = "./images/rain.png";         
            weather_icon.classList.remove("hidden");

        }else{
            weather_icon.src = "./images/mist.png";         
            weather_icon.classList.remove("hidden");

        }

        //City name change
        const city_name = document.getElementById('city_name');
        city_name.innerText = name;
        city_name.classList.remove('hidden')
        
        //Temperature change
        const temperature = document.getElementById('temp_value');
        temperature.innerText = `${(main.temp / 10).toFixed(1)}°C`;
        temperature.classList.remove('hidden');

        //change the wind speed
        const wind_speed = document.getElementById('wind_speed');
        wind_speed.innerText = `${(wind.speed*3.16).toFixed(1)}KM/H`    
        const wind_section = document.getElementById('wind_section');
        wind_section.classList.remove('hidden');  
        
        //humidity change
        let humidity_value = main.humidity;
        const humidity_section = document.getElementById('humidity_section');
        document.getElementById('humidity_value').innerText = `${humidity_value}%`;
        humidity_section.classList.remove('hidden');
    
        
    }

    function showError(){
        //hide display section 
        document.getElementById('display').classList.add('hidden')
        document.getElementById('error_message').classList.remove('hidden')
    }


    function clearDisplay(){
        //reset city name 
        document.getElementById('city_name').innerText = "";
        //reset all weather info
        document.getElementById('city_name').innerText = ""
        document.getElementById('temp_value').innerText = ""
        document.getElementById('wind_speed').innerText = ""
        document.getElementById('humidity_value').innerText = ""

        document.getElementById('weather_icon').classList.add('hidden')
        document.getElementById('wind_section').classList.add('hidden')
        document.getElementById('humidity_section').classList.add('hidden')
        document.getElementById('display').classList.add('hidden')
    }

})

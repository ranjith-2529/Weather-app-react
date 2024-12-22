    import { useEffect, useState } from 'react'
    import './App.css'

    // import images
    import searchIcon from "./assets/search.png";
    import cloudIcon from "./assets/cloud.png" ;
    import sunIcon from "./assets/sun.png"
    import drizzleIcon from "./assets/drizzle.png"
    import windIcon from "./assets/wind.png"
    import snowIcon from "./assets/snow.png"  
    import humidityIcon from "./assets/humidity.png"
    import rainIcon from "./assets/rain.png"
    import clearIcon from "./assets/clear.png"

    const WeatherDetails=({icon,temp,city,country,lat,log,wind,humidity})=>{
    return(
      <>
    <div className='image'>
        <img src ={icon} alt="img"/>

      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
    
      <div className='cord'>
        <div className="lat">Lattitude
        <span>{lat}</span>
        </div>
        <div className="log">Longtitude
        <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className='element'>
          <img src={humidityIcon} alt="humidity" className='icon'/>
          <div className="data">
            <div className="humidity-percent"> {humidity}% </div>
            <div className="text"> Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={windIcon} alt="wind" className='icon'/>
          <div className="data">
            <div className="wind-percent">{wind}km/h</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    
      
      </>
    )
    }
    // WeatherDetails.propTypes={icon:propTypes.string.isRequired,
    //   temp:propTypes.number.isRequired,
    //   city:propTypes.string.isRequired,
    //   country:propTypes.string.isRequired,
    //   humidity:propTypes.number.isRequired,
    //   wind:propTypes.number.isRequired,
    //   lat:propTypes.number.isRequired,
    //   log:propTypes.number.isRequired,
    // }
                                            

    function App() {
          let api_key='8cb9282d71eccbcf5b9f2974641e8f89'
      const[icon,setIcon]=useState('')
      const[temp,setTemp]=useState(0)
      const[city,setCity]=useState("")
      const[country,setCountry]=useState('')
      const[lat,setLat]=useState(0)
      const[log,setLog]=useState(0)
      const[wind,setWind]=useState(0)
      const[humidity,setHumidity]=useState(0)
      const[text,setText]=useState("Madurai")
      const[error,setError]=useState(null)
      const[cityNotFound,setCityNotFound]=useState(false)
      const[loading,setLoading]=useState(false)

      const weatherIconMap = {
        "01d": clearIcon,
        "01n": clearIcon,
      "02d": cloudIcon,
      "02n": cloudIcon,
      "03d": drizzleIcon,
      "03n": drizzleIcon,
      "04d": drizzleIcon,
      "04n": drizzleIcon,
      "09d": rainIcon,
      "09n": rainIcon,
      "10d": rainIcon,
      "10n": rainIcon,
      "13d": snowIcon,
      "13n": snowIcon,
      };
    
      const search= async function (){
              setLoading(true);

              let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`

              try{
                let res= await fetch(url);
                let data = await res.json();
                //console.log(data)
                if(data.cod==="404"){
                  console.log("city not found")
                  cityNotFound(true);
                  setLoading(false);
                  return;
                }
                setHumidity(data.main.humidity);
                setWind(data.wind.speed);
                setTemp(Math.floor(data.main.temp))
                setCity(data.name);
                setCountry(data.sys.country);
                setLat(data.coord.lat);
                setLog(data.coord.lon)
                const weatherIconCode=data.weather[0].icon;
                setIcon(weatherIconCode[weatherIconMap]||clearIcon)
                setCityNotFound(false)
              }catch(error){
                console.error("An error occurred",error.message);
                setError("An error while fetching weather data.")
              }finally{
                setLoading(false);
              }
        }
      const handleCity=(e)=>{
        setText(e.target.value)
      };

      const handleKeyDown=(e)=>{
        if (e.key==="Enter"){
          search()
        }
      }
      useEffect(function(){
        search()
      },[]);
      return (
        <>/
        <div className='container'>
          <div className='input-container'>
          <input type = "text"
                  className='cityInput'
                  placeholder='search city'onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
                  <div className='search-icon' onClick={()=>search()}>
                    <img src={searchIcon} alt="search"/>

                  </div>
          </div>
          {!loading && !cityNotFound &&<WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}
          {loading && <div className='loading-message'>Loading....</div>}
          {error&&<div className='error-message'>{error}</div>}
          {cityNotFound&&<div className='city-not-found'>City not found..</div>}
          
          <p className='copyright'> Design by
            <span> Ranjith S</span>
          </p>
        </div>
          
        </>
      )
    

    }

    export default App

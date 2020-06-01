const request = require('request')
const forecast = (latitude,longitude,callback)=>{
const url = 'http://api.weatherstack.com/current?access_key=678c5e0fe38d0387feaecb59eff4bafe&query=' + latitude + ',' + longitude + '&units=f'
request({url,json:true},(error,{body})=>{
    if(error){
        callback(undefined,"Could'nt connect to the network!!!")
    }else if(body.error){
        callback(undefined,"Incorrect co-ordinates")
    }else{
        callback({
            weather_description :body.current.weather_descriptions[0],
            temperature :body.current.temperature,
           feels_Like : body.current.feelslike,
           precipitation :body.current.precip},undefined) 
           //callback({"It is " + body.current.temperature+" but it feels like "+ body.current.feelslike+" and the precipitation percentage is : "+body.current.precip},undefined) 
            
    }
})
}
module.exports = forecast
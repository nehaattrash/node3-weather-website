const express = require('express') //npm module
const path = require('path') //core module
const app = express()
const hbs = require('hbs')

//console.log(__dirname) //to display the directory (absolute path of the directory)
//console.log(__filename)//to display the filename (absolute path of the file)
//console.log(path.join(__dirname,"../public")) //inorder to get the absolute path of the public folder
const publicDirectoryPath = path.join(__dirname,"../public")
//set up handlebars engine and view location
app.set('view engine', 'hbs')
const viewsPath = path.join(__dirname,"../template/views")
const partialsPath = path.join(__dirname,"../template/partial")
hbs.registerPartials(partialsPath)
app.set('views',viewsPath)
//set up static directory to serve
app.use(express.static(publicDirectoryPath))//Its a way of customizing our server
app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name: 'Neha Gupta'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'Neha Gupta'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name : 'Neha Gupta'
    })
})
/*app.get('/help',(req,res)=>{ //handler
    res.send([{
        name : 'Neha',
        age : 22
    },{
        name : 'Sikha',
        age : 23
    }])
})
app.get('/about',(req,res)=>{ //handler
    res.send('<h1>About</h1>')
})
*/
app.get('/weather',(req,res)=>{ //handler
    if(!req.query.address){
        return res.send({
            error: 'You must send the address parameter'
        })
    }
    const geoCode = require('./utilis/geocode')
    const forecast = require('./utilis/forecast')
    const address = req.query.address
    geoCode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send(error)
        }
        forecast(latitude, longitude, (forecastData,error) => {
            if(error){
                return res.send(error)
            }
            res.send({
                Place : location,
                latitude : latitude,
                longitude : longitude,
                forecast : forecastData
            })
        })
    })
    /*res.send({
        forecast : "It is snowing",
        address: req.query.address
    })*/
})
//Exploring query string property
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return  res.send({
            error: 'You should must send a search term!!'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name:'Neha Gupta',
        errorMessage : 'Help article not found'
        
    })
})
app.get('*',(req,res)=>{ //if the user puts an url other than the above one then use this route handler.* stands for wildcard.
    res.render('404',{
        title : '404 ',
        name : 'Neha Gupta',
        errorMessage : 'Page Not found'
    })
})
app.listen(3000,()=>{
    console.log("Server is up on 3000 port ")
})
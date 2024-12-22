import express from 'express';
import { fileURLToPath } from 'url';
import * as path from 'path';
import hbs from 'hbs';
import * as geocode from './utils/geocode.js'
import * as forecast from './utils/forecast.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// console.log(__filename)
// console.log(__dirname)

// console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Madusanka'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Madusanka'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        title: 'Help Page',
        name: 'Madusanka'
    })
})


app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            'error': 'Address must be given!'
        })
    }

        //desructure
        geocode.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error){
            return res.send({ error })
        }

            //destructure
            forecast.forecast(latitude, longitude, (error, {weather_description, temperature, feelslike}) => {
    
            if(error){
                return res.send({ error })
            }
            
            res.send({
                'forecast': weather_description + '. It is currrently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out',
                location, //shorthand
                'address': req.query.address 
            })
            //console.log(location + ' Weather right now is' );
            //console.log(weather_description + '. It is currrently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out');
    
        })
    
    })

})


app.get('/help/*a', (req, res) => {
    res.render('404', {
        title: '404',
        error_message: 'Help article not found.',
        name: 'Madusanka'
    })
})



app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provides serch term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('*c', (req, res) => {
    res.render('404', {
        title: '404',
        error_message: 'Page not found.',
        name: 'Madusanka'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
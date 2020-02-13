const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geoCode = require('./utils/lattitude')
const WeatherInfo = require('./utils/forecast')

//defining paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setting static html pages as response
app.use(express.static(publicDirectoryPath))

//setting handlebars and views location for dynamic behaviour of html files as response
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


// app.get('', (req, res) => {
//     res.render('<h1>HomePage</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send('<h1>Help</h1>')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        info: 'This page contains home info',
        page: 'Home',
        name: 'Abhinav AV',
        role: 'Developer',
        copyright: 'All Rights reserved for Home Page'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        info: 'This page contains about info',
        page: 'About',
        name: 'Abhinav AV',
        role: 'Developer',
        copyright: 'All Rights reserved for about page'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        info: 'This page contains Help info',
        page: 'Help',
        name: 'Abhinav AV',
        role: 'Developer',
        copyright: 'All Rights reserved for help page'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'no address provided'
        })
    }

    geoCode(req.query.address, (error, {lattitude, longitude, place}={})=>{
        if(req.query.address === undefined){
           return res.send('please enter a place to search')
        } 
        if(error){
          return res.send('unable to connect to the API')
        }
        WeatherInfo(lattitude, longitude, place, (error, Data) =>{
           if(error){
              return res.send('please provide relevent data')
           }
           res.send({
                    location: req.query.address,
                    timezone: Data.TimeZone,
                    temp:Data.Temp,
                    rainPercentage: Data.Rain,
                    weathersummary: Data.summary 
                })
        })
     })
})

       

//     res.send([{
//         searchedPlace: req.query.address,
//         location: 'Bhagalpur',
//         forecast: 'Its 22 degres out there' 
//     },
//     {
//         location: 'Bengalore',
//         forecast: 'Its 28 degres out there' 
//     }])

app.get('/help/*', (req, res) => {
    res.render('404Page', {
        error: 'help article not found',
        info: 'This page contains Help error info',
        copyright: 'All Rights reserved for help page'
    })

})

app.get('/*', (req, res) => {
    res.render('404Page', {
        error: 'Page not found',
        info: 'This page contains error info',
        copyright: 'All Rights reserved for help page'

    })

})

app.listen(3000, () => {
    console.log('server is started on port 3000')
})
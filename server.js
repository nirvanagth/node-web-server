const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs') //set the view engine to hbs


app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile(`server.log`, log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    })
    next()
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
//     next()
// })

app.use(express.static(__dirname + '/public')) //set up static directory register a middleware

hbs.registerHelper('getCurrentYear', () => { //function doesnot take arguments
    return new Date().getFullYear()
    // return 'test'
})

hbs.registerHelper('screamIt', (text) => { //function takes arguments
    return text.toUpperCase()
})
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>')
    // res.send({
    //     name: 'Tianhao',
    //     likes: [
    //         'girls',
    //         'work'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Wecome to home page',
        me: {
            name: 'Tianhao',
                 likes: [
                     'girls',
                     'work'
                 ]
        }
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    })
    // res.send('About page')
})


app.get('/bad', (req, res) => {
    res.send({
        error: 'unable to handle request'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
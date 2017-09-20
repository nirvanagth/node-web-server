const express = require('express')
const hbs = require('hbs')

var app = express()

app.set('view engine', 'hbs') //set the view engine to hbs

app.use(express.static(__dirname + '/public')) //set up static directory

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>')
    res.send({
        name: 'Tianhao',
        likes: [
            'girls',
            'work'
        ]
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs')
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
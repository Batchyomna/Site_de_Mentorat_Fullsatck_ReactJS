const express = require('express')
const app = express()
const port = 8000
const router = require('./routes/routes')

app.use(router);

app.listen(port, () => console.log(`Notre app écoute la porte ${port}!`))



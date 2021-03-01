const express = require('express')
const app = express()
const port = 8000
const router = require('./routes/routes')
const routerSignupIn = require('./routes/routerSignUpIn')
const routesMentor = require('./routes/routesMentor')

app.use(router);
app.use(routerSignupIn);
app.use(routesMentor)

app.listen(port, () => console.log(`Notre app écoute la porte ${port}!`))



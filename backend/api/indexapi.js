const express = require('express')
const app = express()
const port = 8000
const router = require('./routes/router')
const routerSignupIn = require('./routes/routerSignUpIn')
const routerMentor = require('./routes/routerMentor')
const routerAdmin = require('./routes/routerAdmin')

app.use(router);
app.use(routerSignupIn);
app.use(routerMentor)
app.use(routerAdmin)

app.listen(port, () => console.log(`Notre app écoute la porte ${port}!`))



const express = require('express')
const app = express()
const port = 8000

const router = require('./routes/router')
const routerSignupIn = require('./routes/routerSignUpIn')
const routerMentor = require('./routes/routerMentor')
const routerAdmin = require('./routes/routerAdmin')
const routerApprenti = require('./routes/routerApprenti')

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(router);
app.use(routerSignupIn);
app.use(routerMentor)
app.use(routerAdmin)
app.use(routerApprenti)


app.listen(port, () => console.log(`Notre app écoute la porte ${port}!`))



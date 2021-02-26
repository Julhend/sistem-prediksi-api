const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const stockController = require('../../../controllers/stocksController')

app.get('/stock', passport.authenticate('bearer', { session: false }), stockController.getStock)

app.use(mysqlErrorHandler)
module.exports = app
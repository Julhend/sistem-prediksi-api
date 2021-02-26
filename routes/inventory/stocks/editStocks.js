const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const stockController = require('../../../controllers/stocksController')

app.patch('/stock/update', passport.authenticate('bearer', { session: false }), stockController.editstock)

app.use(mysqlErrorHandler)
module.exports = app
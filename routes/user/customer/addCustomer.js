const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const customerController = require('../../../controllers/customerController')

app.post('/customer/add', passport.authenticate('bearer', { session: false }), customerController.registerCustomer)

app.use(mysqlErrorHandler)
module.exports = app
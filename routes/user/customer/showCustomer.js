const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const customerController = require('../../../controllers/customerController')

app.get('/customer/show', passport.authenticate('bearer', { session: false }), customerController.getCustomer)

app.use(mysqlErrorHandler)
module.exports = app
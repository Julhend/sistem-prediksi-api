const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const customerController = require('../../../controllers/customerController')

app.patch('/customer/update', passport.authenticate('bearer', { session: false }), customerController.editCustomer)

app.use(mysqlErrorHandler)
module.exports = app
const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const customerController = require('../../../controllers/customerController')

app.delete('/customer/delete', passport.authenticate('bearer', { session: false }), customerController.deleteCustomer)

app.use(mysqlErrorHandler)
module.exports = app
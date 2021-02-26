const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const bookingController = require('../../../controllers/bookingsController')

app.post('/booking/add', passport.authenticate('bearer', { session: false }), bookingController.addBooking)

app.use(mysqlErrorHandler)
module.exports = app
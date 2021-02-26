const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const bookingController = require('../../../controllers/bookingsController')

app.get('/booking/update', passport.authenticate('bearer', { session: false }), bookingController.getBooking)

app.use(mysqlErrorHandler)
module.exports = app
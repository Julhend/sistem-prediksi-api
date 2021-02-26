const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const bookingController = require('../../../controllers/bookingsController')

app.patch('/booking/update', passport.authenticate('bearer', { session: false }), bookingController.editBooking)

app.use(mysqlErrorHandler)
module.exports = app
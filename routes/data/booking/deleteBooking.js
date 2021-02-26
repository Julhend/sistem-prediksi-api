const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const bookingController = require('../../../controllers/bookingsController')

app.delete('/booking/delete', passport.authenticate('bearer', { session: false }), bookingController.deleteBooking)

app.use(mysqlErrorHandler)
module.exports = app
const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const categoryController = require('../../../controllers/categoriesController')

app.get('/category', passport.authenticate('bearer', { session: false }), categoryController.getCategory)

app.use(mysqlErrorHandler)
module.exports = app
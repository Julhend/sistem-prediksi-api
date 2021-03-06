const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const categoryController = require('../../../controllers/categoriesController')

app.post('/category/add', passport.authenticate('bearer', { session: false }), categoryController.addCategory)

app.use(mysqlErrorHandler)
module.exports = app
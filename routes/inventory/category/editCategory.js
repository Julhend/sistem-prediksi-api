const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const categoryController = require('../../../controllers/categoriesController')

app.patch('/category/edit', passport.authenticate('bearer', { session: false }), categoryController.editCategory)

app.use(mysqlErrorHandler)
module.exports = app
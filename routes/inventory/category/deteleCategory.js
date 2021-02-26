const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const categoryController = require('../../../controllers/categoriesController')

app.delete('/category/delete', passport.authenticate('bearer', { session: false }), categoryController.deleteCategory)

app.use(mysqlErrorHandler)
module.exports = app
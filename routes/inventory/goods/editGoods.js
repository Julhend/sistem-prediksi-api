const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const goodsController = require('../../../controllers/goodsController')

app.patch('/goods/update', passport.authenticate('bearer', { session: false }), goodsController.editGoods)

app.use(mysqlErrorHandler)
module.exports = app
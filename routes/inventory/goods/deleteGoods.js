const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const goodsController = require('../../../controllers/goodsController')

app.delete('/goods/delete', passport.authenticate('bearer', { session: false }), goodsController.deleteGoods)

app.use(mysqlErrorHandler)
module.exports = app
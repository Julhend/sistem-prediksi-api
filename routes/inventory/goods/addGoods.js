const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const goodsController = require('../../../controllers/goodsController')

app.post('/goods/add', passport.authenticate('bearer', { session: false }), goodsController.addGoods)

app.use(mysqlErrorHandler)
module.exports = app
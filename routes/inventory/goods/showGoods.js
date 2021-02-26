const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const goodsController = require('../../../controllers/goodsController')

app.get('/goods', passport.authenticate('bearer', { session: false }), goodsController.getGoods)

app.use(mysqlErrorHandler)
module.exports = app
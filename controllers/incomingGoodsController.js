const db = require('../models')
const { v4 } = require('uuid')


class incomingGoodsController {
    static async addIncomingGoods(req, res, next) {
        const today = moment().format("YYYY-MM-DD");
        //const then = moment(moment().add(30, 'days')).format("YYYY-MM-DD");

        let body = req.body
        body.id = v4()
        body.date = today
        const check = await db.incomingGoods.findAll({
            where: {
                id: body.id
            }
        })
            .catch((err) => next(err))
        if (check.length > 0) {
            return res.status(409).send('data already added')
        }
        else {
            const result = await db.incomingGoods.create(body)
                .catch((err) => next(err))
            res.send(result)

            const goods = {
                stock: req.query.quantity,
                price: req.query.price
            }

            await db.goods.update(
                goods,
                {
                    where: {
                        id: req.query.goodsId
                    }
                })
                .catch(err => next(err))

        }
    }
    static async getIncomingGoods(req, res, next) {
        const check = await db.incomingGoods.findAll({
            where: req.query,
            include: db.goods,
            attributes: ['name'],
            include: db.users,
            attributes: ['name'],
            include: db.suppliers,
            // attributes: ['name'],
        })
            .catch((err) => next(err))
        if (!check.length) {
            return res.status(404).send('data not found')
        }
        else {
            res.send(check)
        }
    }
    static async editIncomingGoods(req, res, next) {
        let body = req.body
        const check = await db.incomingGoods.findAll({
            where: {
                id: req.query.id
            }
        })
            .catch((err) => next(err))
        if (check.length == 0) {
            return res.status(404).send('data not found')
        }
        else {
            const result = await db.incomingGoods.update(
                body,
                {
                    where: {
                        id: req.query.id
                    }
                })
                .catch(err => next(err))
            if (result == 1) {
                const check1 = await db.incomingGoods.findAll({
                    where: {
                        id: req.query.id
                    }
                })
                    .catch((err) => next(err))
                res.send(check1)
            } else {
                res.send("update failed")
            }

        }
    }
    static async deleteIncomingGoods(req, res, next) {
        let query = req.query
        const check = await db.incomingGoods.findAll({
            where: {
                id: query.id
            }
        })
            .catch((err) => next(err))
        if (!check.length) {
            return res.status(404).send('data not found')
        }
        else {
            const result = await db.incomingGoods.destroy({
                where: {
                    id: query.id
                }
            })
                .catch((err) => next(err))
            if (result == 1) {
                res.send("delete success")
            } else {
                res.send("delete failed")
            }

        }
    }
}


module.exports = incomingGoodsController

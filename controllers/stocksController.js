const db = require('../models')
const { v4 } = require('uuid')


class stocksController {
    static async getStock(req, res, next) {
        const check = await db.stocks.findAll({
            where: req.query,
            include: db.goods
        })
            .catch((err) => next(err))
        if (!check.length) {
            return res.status(404).send('this goods has no stock')
        }
        else {
            res.send(check)
        }
    }
    static async editstock(req, res, next) {
        let body = req.body
        const check = await db.stocks.findAll({
            where: {
                id: req.query.id
            }
        })
            .catch((err) => next(err))
        if (check.length == 0) {
            return res.status(404).send('goods not found')
        }
        else {
            const result = await db.goods.update(
                body,
                {
                    where: {
                        name: req.query.name
                    }
                })
                .catch(err => next(err))
            if (result == 1) {
                const check1 = await db.goods.findAll({
                    where: {
                        name: req.goods.name
                    }
                })
                    .catch((err) => next(err))
                res.send(check1)
            } else {
                res.send("update failed")
            }

        }
    }
    static async deleteStock(req, res, next) {
        let query = req.query
        const check = await db.stocks.findAll({
            where: {
                id: query.id
            }
        })
            .catch((err) => next(err))
        if (!check.length) {
            return res.status(404).send('goods not found')
        }
        else {
            const result = await db.stocks.destroy({
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

module.exports = stocksController
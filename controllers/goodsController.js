const db = require('../models')
const { v4 } = require('uuid')


class goodsController {
    static async addGoods(req, res, next) {
        let body = req.body
        body.id = v4()
        const check = await db.goods.findAll({
            where: {
                name: body.name
            }
        })
            .catch((err) => next(err))
        if (check.length > 0) {
            return res.status(409).send('goods already added')
        }
        else {
            const result = await db.Goods.create(body)
                .catch((err) => next(err))
            res.send(result)
        }
    }
    static async getGoods(req, res, next) {
        const check = await db.goods.findAll({
            where: req.query,
            // include: db.stocks
        })
            .catch((err) => next(err))
        if (!check.length) {
            return res.status(404).send('goods not found')
        }
        else {
            res.send(check)
        }
    }
    static async editGoods(req, res, next) {
        let body = req.body
        const check = await db.goods.findAll({
            where: {
                name: req.query.name
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
    static async deleteGoods(req, res, next) {
        let query = req.query
        const check = await db.goods.findAll({
            where: {
                name: query.name
            }
        })
            .catch((err) => next(err))
        if (!check.length) {
            return res.status(404).send('goods not found')
        }
        else {
            const result = await db.goods.destroy({
                where: {
                    name: query.name
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

module.exports = goodsController
const db = require('../models')
const { v4 } = require('uuid')


class categoriesController {
    static async addCategory(req, res, next) {
        let body = req.body
        body.id = v4()
        const check = await db.categories.findAll({
            where: {
                name: body.name
            }
        })
            .catch((err) => next(err))
        if (check.length > 0) {
            return res.status(409).send('category already added')
        }
        else {
            const result = await db.categories.create(body)
                .catch((err) => next(err))
            res.send(result)
        }
    }
    static async getCategory(req, res, next) {
        const check = await db.categories.findAll({
            where: req.query
        })
            .catch((err) => next(err))
        if (!check.length) {
            return res.status(404).send('category not found')
        }
        else {
            res.send(check)
        }
    }
    static async editCategory(req, res, next) {
        let body = req.body
        const check = await db.categories.findAll({
            where: query
        })
            .catch((err) => next(err))
        if (check.length == 0) {
            return res.status(404).send('category not found')
        }
        else {
            const result = await db.categories.update(
                body,
                {
                    where: query
                })
                .catch(err => next(err))
            if (result == 1) {
                const check1 = await db.categories.findAll({
                    where: query
                })
                    .catch((err) => next(err))
                res.send(check1)
            } else {
                res.send("update failed")
            }

        }
    }
    static async deleteCategory(req, res, next) {
        let query = req.query
        const check = await db.categories.findAll({
            where: query
        })
            .catch((err) => next(err))
        if (!check.length) {
            return res.status(404).send('category not found')
        }
        else {
            const result = await db.categories.destroy({
                where: query
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

module.exports = categoriesController

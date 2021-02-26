const db = require('../models')
const { v4 } = require('uuid')


class customerController {
    static async registerCustomer(req, res, next) {
        let body = req.body
        body.id = v4()
        body.photo = `${process.env.HOSTNAME}/files/defaultFotoProfile.jpg`
        const check = await db.customers.findAll({
            where: {
                email: body.email
            }
        })
            .catch((err) => next(err))
        if (check.length > 0) {
            return res.status(409).send('customer already added')
        }
        else {
            const result = await db.customers.create(body)
                .catch((err) => next(err))
            res.send(result)
        }
    }
    static async getCustomer(req, res, next) {
        const check = await db.customers.findAll({
            where: req.query
        })
            .catch((err) => next(err))
        if (!check.length) {
            return res.status(404).send('customer not found')
        }
        else {
            res.send(check)
        }
    }
    static async getCustomerByEmail(req, res, next) {
        const check = await db.customers.findAll({
            where: { email: req.query.email }
        })
            .catch((err) => next(err))
        if (!check.length) {
            return res.status(404).send('customer not found')
        }
        else {
            res.send(check)
        }
    }

    static async editCustomer(req, res, next) {
        let body = req.body
        const check = await db.customers.findAll({
            where: {
                email: req.query.email
            }
        })
            .catch((err) => next(err))
        if (check.length == 0) {
            return res.status(404).send('customer not found')
        }
        else {
            const result = await db.customers.update(
                body,
                {
                    where: {
                        email: req.query.email
                    }
                })
                .catch(err => next(err))
            if (result == 1) {
                const check1 = await db.customers.findAll({
                    where: {
                        email: req.query.email
                    }
                })
                    .catch((err) => next(err))
                res.send(check1)
            } else {
                res.send("update failed")
            }

        }
    }
    static async deleteCustomer(req, res, next) {
        let query = req.query
        const check = await db.customers.findAll({
            where: {
                email: query.email
            }
        })
            .catch((err) => next(err))
        if (!check.length) {
            return res.status(404).send('customer not found')
        }
        else {
            const result = await db.customers.destroy({
                where: {
                    email: query.email
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

module.exports = customerController

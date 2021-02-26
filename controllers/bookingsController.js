const db = require('../models')
const { v4 } = require('uuid')
const moment = require('moment')

class bookingsController {
    static async addBooking(req, res, next) {
        const today = moment().format("YYYY-MM-DD");
        //const then = moment(moment().add(30, 'days')).format("YYYY-MM-DD");

        let body = req.body
        body.id = v4()
        body.date = today
        const check = await db.bookings.findAll({
            where: {
                id: body.id
            }
        })
            .catch((err) => next(err))
        if (check.length > 0) {
            return res.status(409).send('booking already added')
        }
        else {
            const result = await db.bookings.create(body)
                .catch((err) => next(err))
            res.send(result)
        }
    }
    static async getBooking(req, res, next) {
        const check = await db.bookings.findAll({
            where: req.query,
            include: db.goods,
            attributes: ['name'],
            include: db.goods,
            attributes: ['name'],
            include: db.suppliers,
            // attributes: ['name'],
        })
            .catch((err) => next(err))
        if (!check.length) {
            return res.status(404).send('booking not found')
        }
        else {
            res.send(check)
        }
    }
    static async editBooking(req, res, next) {
        let body = req.body
        const check = await db.bookings.findAll({
            where: {
                id: req.query.id
            }
        })
            .catch((err) => next(err))
        if (check.length == 0) {
            return res.status(404).send('booking not found')
        }
        else {
            const result = await db.bookings.update(
                body,
                {
                    where: {
                        id: req.query.id
                    }
                })
                .catch(err => next(err))
            if (result == 1) {
                const check1 = await db.bookings.findAll({
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
    static async deleteBooking(req, res, next) {
        let query = req.query
        const check = await db.bookings.findAll({
            where: {
                id: query.id
            }
        })
            .catch((err) => next(err))
        if (!check.length) {
            return res.status(404).send('booking not found')
        }
        else {
            const result = await db.bookings.destroy({
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

module.exports = bookingsController

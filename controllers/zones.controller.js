const db = require("../DB/MongoDB").get_DB
var { ObjectId } = require('mongodb');


exports.createZone = async (req, res, next) => {
    try {
        let { userId, name, zone } = req.body
        if (userId && name && zone) {
            await db().collection('zones').insertOne({ userId: new ObjectId(userId), name, zone })
            res.status(201).send({ message: "The zone created successfully" })
        } else {
            throw "Please make sure enter data correctly"
        }

    } catch (error) {
        next(new Error(error))
    }
}

exports.deleteZone = async (req, res, next) => {
    try {
        let { zondeId } = req.params
        let result = await db().collection('zones').deleteOne({ _id: new ObjectId(zondeId) })
        if (result.deletedCount > 0) {
            res.status(200).send({ message: "The zone deleted successfully" })
        } else {
            res.status(200).send({ message: "There are no zone with this ID" })
        }
    } catch (error) {
        next(new Error(error))
    }
}

exports.updateZone = async (req, res, next) => {
    try {
        let data = req.body
        let payload = {}
        if (req.params.zondeId && data.name || data.name) {
            let zondeId = req.params.zondeId
            if (data.name) {
                payload.name = data.name
            }
            if (data.zone) {
                payload.zone = data.zone
            }
            let result = await db().collection('zones').updateOne({ _id: new ObjectId(zondeId) }, { $set: payload })
            if (result.modifiedCount > 0) {
                res.status(200).send({ message: "The zone updated successfully" })
            } else {
                res.status(200).send({ message: "There are no zone with this ID" })
            }
        } else {
            throw "Please make sure enter data correctly"
        }
    } catch (error) {
        next(new Error(error))
    }
}

exports.getZoneByPoint = async (req, res, next) => {
    try {
        let { lng, lat } = req.query
        let { userId } = req.body
        if (userId && lng && lat) {
            let point = { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] }
            let zones = await db().collection('zones').find({ userId: new ObjectId(userId), zone: { $geoIntersects: { $geometry: point } } }).toArray()
            res.status(200).send({ zones })
        } else {
            throw "Please make sure enter data correctly"
        }

    } catch (error) {
        next(new Error(error))
    }
}

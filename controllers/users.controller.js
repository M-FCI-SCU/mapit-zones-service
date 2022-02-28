const db = require("../DB/MongoDB").get_DB

exports.createUser = async (req, res, next) => {
    try {
        let { name } = req.body
        let result = await db().collection('users').insertOne({ name })
        res.status(200).send({ message: "The user creared successfully", result })
    } catch (error) {
        next(new Error(error))
    }
}
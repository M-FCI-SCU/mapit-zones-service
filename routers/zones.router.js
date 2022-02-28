
const express = require('express')
const router = express.Router();
const {zonesController} = require('../controllers')


router.post('/create_zone', zonesController.createZone)
router.put('/update_zone/:zondeId', zonesController.updateZone)
router.get('/get_zone_by_point', zonesController.getZoneByPoint)
router.delete('/delete_zone/:zondeId', zonesController.deleteZone)

module.exports = router

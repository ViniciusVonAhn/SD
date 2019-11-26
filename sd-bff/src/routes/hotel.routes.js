const hotelControler = require('../controllers/hotel.controller')
let router = require('express').Router()

router.get('/hoteis/count/:params', hotelControler.count)
router.get('/hoteis/find/:params', hotelControler.getAllHotelParams)
router.delete('/hoteis/:id', hotelControler.deleteHotel)
router.put('/hoteis', hotelControler.putHotel)
router.post('/hoteis', hotelControler.postHotel)

module.exports = router

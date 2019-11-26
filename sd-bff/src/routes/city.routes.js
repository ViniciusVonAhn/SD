const cityControler = require('../controllers/city.controller')
let router = require('express').Router()

router.get('/cities', cityControler.getAllCity)
router.get('/cities/count/:params', cityControler.count)
router.get('/cities/find/:params', cityControler.getCityParams)
router.get('/cities/active', cityControler.getAllCityActive)
router.get('/cities/:id', cityControler.getCityById)
router.get('/cities/name/:name', cityControler.getCityByName)
router.get('/cities/idCountryidUf/:idCountry/:idUf', cityControler.getCityAllByIdCountryAndIdUf)
router.delete('/cities/:id', cityControler.deleteCity)
router.put('/cities', cityControler.putCity)
router.post('/cities', cityControler.postCity)

module.exports = router
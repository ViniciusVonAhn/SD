const countryControler = require('../controllers/country.controller')
let router = require('express').Router()

router.get('/country/count/:params', countryControler.count)
router.get('/country/find/:params', countryControler.getCountryParams)
router.delete('/country/:id', countryControler.deleteCountry)
router.put('/country', countryControler.putCountry)
router.post('/country', countryControler.postCountry)

module.exports = router

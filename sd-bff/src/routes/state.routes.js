const stateControler = require('../controllers/state.controller')
let router = require('express').Router()


router.get('/state/count/:params', stateControler.count)
router.get('/state/find/:params', stateControler.getStateParams)
router.get('/state/regions', stateControler.getAllRegions)
router.delete('/state/:id', stateControler.deleteState)
router.put('/state', stateControler.putState)
router.post('/state', stateControler.postState)

module.exports = router
const funcionarioControler = require('../controllers/funcionario.controller')
let router = require('express').Router()

router.get('/funcionarios/name/:params', funcionarioControler.getNameHotel)
router.get('/funcionarios/count/:params', funcionarioControler.count)
router.get('/funcionarios/find/:params', funcionarioControler.getAllFuncionarioParams)
router.delete('/funcionarios/:id', funcionarioControler.deleteFuncionario)
router.put('/funcionarios', funcionarioControler.putFuncionario)
router.post('/funcionarios', funcionarioControler.postFuncionario)

module.exports = router
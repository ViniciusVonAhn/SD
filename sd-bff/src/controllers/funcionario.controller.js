const funcionarioService = require('../services/funcionario.service')

exports.getNameHotel = async (req, res, next) => {
    let params = req.params.params;
    await funcionarioService.getNameHotel(params)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.deleteFuncionario = async (req, res, next) => {
    let id = req.params.id
    await funcionarioService.deleteFuncionario(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.getAllFuncionarioParams = async (req, res, next) => {
    let params = req.params.params;
    await funcionarioService.getAllFuncionarioParams(params)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.count = async (req, res, next) => {
    let params = req.params.params;
    await funcionarioService.count(params)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.postFuncionario = async (req, res, next) => {
    let funcionario = req.body;
    await funcionarioService.postFuncionario(funcionario)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.putFuncionario = async (req, res, next) => {
    let funcionario = req.body;
    await funcionarioService.putFuncionario(funcionario)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}
const genericFiergs = require('../genericFunction/functions.js')

exports.getNameHotel = async (params) => {
    return new Promise(async (resolve, reject) => {
        await genericFiergs.getDataWithParams(process.env.URL_LOCAL, process.env.PATH_FUNCIONARIO + 'name', params)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.deleteFuncionario = async (id) => {
    return new Promise(async (resolve, reject) => {
        await genericFiergs.deleteWithId(process.env.URL_LOCAL, process.env.PATH_FUNCIONARIO, id)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.getAllFuncionarioParams = async (params) => {
    return new Promise(async (resolve, reject) => {
        await genericFiergs.getDataWithParams(process.env.URL_LOCAL, process.env.PATH_FUNCIONARIO, params)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.count = async (params) => {
    return new Promise(async (resolve, reject) => {
        await genericFiergs.getDataWithParams(process.env.URL_LOCAL, process.env.PATH_FUNCIONARIO + 'count', params)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.postFuncionario = async (data) => {
    return new Promise(async (resolve, reject) => {
        await genericFiergs.postData(process.env.URL_LOCAL, process.env.PATH_FUNCIONARIO, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.putFuncionario = async (data) => {
    return new Promise(async (resolve, reject) => {
        await genericFiergs.putData(process.env.URL_LOCAL, process.env.PATH_FUNCIONARIO + data.id, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}
const generic = require('../genericFunction/functions')

exports.getAllCityParams = async (params) => {
    return new Promise(async (resolve, reject) => {
        await generic.getDataWithParams(process.env.URL_LOCAL, process.env.PATH_CITY, params)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.count = async (params) => {
    return new Promise(async (resolve, reject) => {
        await generic.getDataWithParams(process.env.URL_LOCAL, process.env.PATH_CITY + 'count', params)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.getAllCity = async () => {
    return new Promise(async (resolve, reject) => {
        await generic.getData(process.env.URL_LOCAL, process.env.PATH_CITY)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.getAllCityActive = async (active) => {
    return new Promise(async (resolve, reject) => {
        await generic.getData(process.env.URL_LOCAL, process.env.PATH_CITY + '/active', active)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.getCityById = async (id) => {
    return new Promise(async (resolve, reject) => {
        await generic.getDataWithId(process.env.URL_LOCAL, process.env.PATH_CITY, id)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.getCityByName = async (name) => {
    return new Promise(async (resolve, reject) => {
        await generic.getDataWithId(process.env.URL_LOCAL, process.env.PATH_CITY + '/name/', name)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.deleteCity = async (id) => {
    return new Promise(async (resolve, reject) => {
        await generic.deleteWithId(process.env.URL_LOCAL, process.env.PATH_CITY, id)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.postCity = async (data) => {
    return new Promise(async (resolve, reject) => {
        await generic.postData(process.env.URL_LOCAL, process.env.PATH_CITY, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.putCity = async (data) => {
    return new Promise(async (resolve, reject) => {
        await generic.putData(process.env.URL_LOCAL, process.env.PATH_CITY + data.id, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}


const generic = require('../genericFunction/functions')

exports.deleteCountry = async (id) => {
    return new Promise(async (resolve, reject) => {
        await generic.deleteWithId(process.env.URL_LOCAL, process.env.PATH_COUNTRY, id)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.getAllCountryParams = async (params) => {
    return new Promise(async (resolve, reject) => {
        await generic.getDataWithParams(process.env.URL_LOCAL, process.env.PATH_COUNTRY, params)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.count = async (params) => {
    return new Promise(async (resolve, reject) => {
        await generic.getDataWithParams(process.env.URL_LOCAL, process.env.PATH_COUNTRY + 'count', params)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.postCountry = async (data) => {
    return new Promise(async (resolve, reject) => {
        await generic.postData(process.env.URL_LOCAL, process.env.PATH_COUNTRY, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.putCountry = async (data) => {
    return new Promise(async (resolve, reject) => {
        await generic.putData(process.env.URL_LOCAL, process.env.PATH_COUNTRY + data.id, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}



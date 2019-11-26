const generic = require('../genericFunction/functions')

exports.deleteHotel = async (id) => {
    return new Promise(async (resolve, reject) => {
        await generic.deleteWithId(process.env.URL_LOCAL, process.env.PATH_HOTEL, id)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.getAllHotelParams = async (params) => {
    return new Promise(async (resolve, reject) => {
        await generic.getDataWithParams(process.env.URL_LOCAL, process.env.PATH_HOTEL, params)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.count = async (params) => {
    return new Promise(async (resolve, reject) => {
        await generic.getDataWithParams(process.env.URL_LOCAL, process.env.PATH_HOTEL + 'count', params)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.postHotel = async (data) => {
    return new Promise(async (resolve, reject) => {
        await generic.postData(process.env.URL_LOCAL, process.env.PATH_HOTEL, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.putHotel = async (data) => {
    return new Promise(async (resolve, reject) => {
        await generic.putData(process.env.URL_LOCAL, process.env.PATH_HOTEL + data.id, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}



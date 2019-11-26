const generic = require('../genericFunction/functions')

exports.getAllRegions = async () => {
    return new Promise(async (resolve, reject) => {
        await generic.getData(process.env.URL_LOCAL, process.env.PATH_STATE + "regions")
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.deleteState = async (id) => {
    return new Promise(async (resolve, reject) => {
        await generic.deleteWithId(process.env.URL_LOCAL, process.env.PATH_STATE, id)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.getAllStateParams = async (params) => {
    return new Promise(async (resolve, reject) => {
        await generic.getDataWithParams(process.env.URL_LOCAL, process.env.PATH_STATE, params)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.count = async (params) => {
    return new Promise(async (resolve, reject) => {
        await generic.getDataWithParams(process.env.URL_LOCAL, process.env.PATH_STATE + 'count', params)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.postState = async (data) => {
    return new Promise(async (resolve, reject) => {
        await generic.postData(process.env.URL_LOCAL, process.env.PATH_STATE, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

exports.putState = async (data) => {
    return new Promise(async (resolve, reject) => {
        await generic.putData(process.env.URL_LOCAL, process.env.PATH_STATE + data.id, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}
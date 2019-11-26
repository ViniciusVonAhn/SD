const cityService = require('../services/city.service')

exports.getCityById = async (req, res, next) => {
    let id = req.params.id
    await cityService.getCityById(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.count = async (req, res, next) => {
    let params = req.params.params;
    await cityService.count(params)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.getCityParams = async (req, res, next) => {
    let params = req.params.params;
    await cityService.getAllCityParams(params)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.getCityByName = async (req, res, next) => {
    let name = req.params.name
    console.log(name)
    await cityService.getCityByName(encodeURIComponent(name))
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.getCityAllByIdCountryAndIdUf = async (req, res, next) => {
    let name = req.params.name
    console.log(name)
    await cityService.getCityAllByIdCountryAndIdUf(encodeURIComponent(name))
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.deleteCity = async (req, res, next) => {
    let id = req.params.id
    await cityService.deleteCity(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.getAllCity = async (req, res, next) => {
    await cityService.getAllCity()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.getAllCityActive = async (req, res, next) => {
    let active = req.params.active
    await cityService.getAllCityActive(active)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.postCity = async (req, res, next) => {
    let city = req.body;
    await cityService.postCity(city)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.putCity = async (req, res, next) => {
    let city = req.body;
    await cityService.putCity(city)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

const countryService = require('../services/country.service')

exports.deleteCountry = async (req, res, next) => {
    let id = req.params.id
    await countryService.deleteCountry(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.getCountryParams = async (req, res, next) => {
    let params = req.params.params;
    await countryService.getAllCountryParams(params)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.count = async (req, res, next) => {
    let params = req.params.params;
    await countryService.count(params)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.postCountry = async (req, res, next) => {
    let country = req.body;
    await countryService.postCountry(country)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.putCountry = async (req, res, next) => {
    let country = req.body;
    await countryService.putCountry(country)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}
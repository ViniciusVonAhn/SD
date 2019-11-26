const stateService = require('../services/state.service')

exports.deleteState = async (req, res, next) => {
    let id = req.params.id
    await stateService.deleteState(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.getAllRegions = async (req, res, next) => {
    await stateService.getAllRegions()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.getStateParams = async (req, res, next) => {
    let params = req.params.params;
    await stateService.getAllStateParams(params)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.count = async (req, res, next) => {
    let params = req.params.params;
    await stateService.count(params)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.postState = async (req, res, next) => {
    let state = req.body;
    await stateService.postState(state)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.putState = async (req, res, next) => {
    let state = req.body;
    await stateService.putState(state)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}
const hotelService = require('../services/hotel.service')

exports.deleteHotel = async (req, res, next) => {
    let id = req.params.id
    await hotelService.deleteHotel(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.getAllHotelParams = async (req, res, next) => {
    let params = req.params.params;
    await hotelService.getAllHotelParams(params)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.count = async (req, res, next) => {
    let params = req.params.params;
    await hotelService.count(params)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.postHotel = async (req, res, next) => {
    let hotel = req.body;
    await hotelService.postHotel(hotel)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}

exports.putHotel = async (req, res, next) => {
    let hotel = req.body;
    await hotelService.putHotel(hotel)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}
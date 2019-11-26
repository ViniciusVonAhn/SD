const hotelRepository = require('../repository/hotel.repository')
const msgWarnings = require('../genericFunction/mensagens')

exports.deleteHotel = async (id) => {
    let result;
    if (id) {
        await hotelRepository.deleteHotel(id)
            .then(response => {
                result = response
            })
            .catch(error => {
                return error
            })
    } else {
        result = msgWarnings.mensagemDadosIncompletos
    }
    return result

};

exports.getAllHotelParams = async (params) => {
    let result;
    if (params) {
        await hotelRepository.getAllHotelParams(params)
            .then(response => {
                result = response
            })
            .catch(error => {
                return error
            })
    } else {
        result = msgWarnings.mensagemDadosIncompletos
    }
    return result

};

exports.count = async (params) => {
    let result;
    if (params) {
        await hotelRepository.count(params)
            .then(response => {
                result = response
            })
            .catch(error => {
                return error
            })
    } else {
        result = msgWarnings.mensagemDadosIncompletos
    }
    return result

};

exports.postHotel = async (hotel) => {
    let result;
    if (hotel) {
        await hotelRepository.postHotel(hotel)
            .then(response => {
                result = response
            })
            .catch(error => {
                return error
            })
    } else {
        result = msgWarnings.mensagemDadosIncompletos
    }
    return result

};

exports.putHotel = async (hotel) => {
    let result;
    if (hotel) {
        await hotelRepository.putHotel(hotel)
            .then(response => {
                result = response
            })
            .catch(error => {
                return error
            })
    } else {
        result = msgWarnings.mensagemDadosIncompletos
    }
    return result

};

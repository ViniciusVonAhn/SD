const countryRepository = require('../repository/country.repository')
const msgWarnings = require('../genericFunction/mensagens.fiergs')

exports.deleteCountry = async (id) => {
    let result;
    if (id) {
        await countryRepository.deleteCountry(id)
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

exports.getAllCountryParams = async (params) => {
    let result;
    if (params) {
        await countryRepository.getAllCountryParams(params)
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
        await countryRepository.count(params)
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

exports.postCountry = async (country) => {
    let result;
    if (country) {
        await countryRepository.postCountry(country)
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

exports.putCountry = async (country) => {
    let result;
    if (country) {
        await countryRepository.putCountry(country)
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

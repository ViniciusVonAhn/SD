    const cityRepository = require('../repository/city.repository')
    const msgWarnings = require('../genericFunction/mensagens.fiergs')

    exports.getAllCityParams = async (params) => {
        let result;
        if (params) {
            await cityRepository.getAllCityParams(params)
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
            await cityRepository.count(params)
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

    exports.getCityById = async (id) => {
        let result;
        if (id) {
            await cityRepository.getCityById(id)
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
    
    exports.getCityByName = async (name) => {
        let result;
        if (name) {
            await cityRepository.getCityByName(name)
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

    exports.getCityAllByIdCountryAndIdUf = async (idCountry, idUf) => {
        let result;
        console.log(idCountry)
        console.log(idUf)
        if (idCountry && idUf) {
            await cityRepository.getCityAllByIdCountryAndIdUf(idCountry, idUf)
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
    
    exports.deleteCity = async (id) => {
        let result;
        if (id) {
            await cityRepository.deleteCity(id)
                .then(response => {
                    result = response
                    console.log(result)
                })
                .catch(error => {
                    return error
                })
        } else {
            result = msgWarnings.mensagemDadosIncompletos
        }
        return result
    
    };
    
    exports.getAllCity = async () => {
        let result;
        await cityRepository.getAllCity()
            .then(response => {
                result = response
            })
            .catch(error => {
                return error
            });
        return result;
    };

    exports.getAllCityActive = async (active) => {
        let result;
        await cityRepository.getAllCityActive(active)
            .then(response => {
                result = response
            })
            .catch(error => {
                return error
            });
        return result;
    };
    
    exports.postCity = async (city) => {
        let result;
        if (city) {
            await cityRepository.postCity(city)
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
    
    exports.putCity = async (city) => {
        let result;
        if (city) {
            await cityRepository.putCity(city)
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
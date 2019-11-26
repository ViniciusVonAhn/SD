    const stateRepository = require('../repository/state.repository')
    const msgWarnings = require('../genericFunction/mensagens.fiergs')

    exports.deleteState = async (id) => {
        let result;
        if (id) {
            await stateRepository.deleteState(id)
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

    exports.getAllRegions = async () => {
        let result;
        await stateRepository.getAllRegions()
            .then(response => {
                result = response
            })
            .catch(error => {
                return error
            });
        return result;
    };

    exports.getAllStateParams = async (params) => {
        let result;
        if (params) {
            await stateRepository.getAllStateParams(params)
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
            await stateRepository.count(params)
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

    exports.postState = async (state) => {
        let result;
        if (state) {
            await stateRepository.postState(state)
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

    exports.putState = async (state) => {
        let result;
        if (state) {
            await stateRepository.putState(state)
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

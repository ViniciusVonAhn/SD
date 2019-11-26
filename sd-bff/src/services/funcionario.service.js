const funcionarioRepository = require('../repository/funcionario.repository')
const msgWarnings = require('../genericFunction/mensagens')
const hotelRepository = require('../repository/hotel.repository')

exports.getNameHotel = async (params) => {
    let result;
    if (params) {
        async function updateValue() {
            for (let cn of result.body) {
                await hotelRepository.getAllHotelParams('id===:' + cn.hotel).then(data => {
                    cn.hotel = data.body[0].name;
                });
            }
        }

        await funcionarioRepository.getAllFuncionarioParams(params)
            .then(async response => {
                result = response
                await updateValue();
            })
            .catch(error => {
                return error
            })
    } else {
        result = msgWarnings.mensagemDadosIncompletos
    }
    return result

};

exports.deleteFuncionario = async (id) => {
    let result;
    if (id) {
        await funcionarioRepository.deleteFuncionario(id)
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

exports.getAllFuncionarioParams = async (params) => {
    let result;
    if (params) {
        await funcionarioRepository.getAllFuncionarioParams(params)
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
        await funcionarioRepository.count(params)
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

exports.postFuncionario = async (funcionario) => {
    let result;
    if (funcionario) {
        await funcionarioRepository.postFuncionario(funcionario)
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

exports.putFuncionario = async (funcionario) => {
    let result;
    if (funcionario) {
        await funcionarioRepository.putFuncionario(funcionario)
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

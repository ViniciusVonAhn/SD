package br.org.senac.funcionarioservice.service;

import br.org.senac.funcionarioservice.entity.Funcionario;
import br.org.senac.funcionarioservice.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public Funcionario save(Funcionario funcionario){
        Optional<List<Funcionario>> optionalFuncionarios = funcionarioRepository.findByNameIgnoreCase(funcionario.getName());

        if(optionalFuncionarios.isEmpty()){
            return funcionarioRepository.save(funcionario);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Funcionário já cadastrado!");
        }
    }

    public Funcionario edit(Funcionario funcionario){
        Optional<List<Funcionario>> optionalFuncionarios = funcionarioRepository.findAllByNameIgnoreCaseAndIdIsNot(funcionario.getName(), funcionario.getId());

        if(optionalFuncionarios.isEmpty()){
            return funcionarioRepository.save(funcionario);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Funcionário Já cadastrado!");
        }
    }

    //public List<Funcionario> findAll(){
        //return funcionarioRepository.findAll();
    //}

    //public Optional<Funcionario> findByName(String name){
        //return funcionarioRepository.findAllByNameContainingIgnoreCase(name);
    //}

    //public Funcionario save(Funcionario funcionario){
        //Optional<List<Funcionario>> optionalFuncionarios = funcionarioRepository.findByNameIgnoreCase(funcionario.getName());
        //if(optionalFuncionarios.isEmpty()){
            //return funcionarioRepository.save(funcionario);
        //} else {
            //throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Funcionario já cadastrado!");
        //}
    //}

    //public Funcionario edit(Funcionario funcionario){
        //Optional<Funcionario> optionalFuncionario = funcionarioRepository.findAllByNameIgnoreCaseAndIdIsNot(funcionario.getName(), funcionario.getId());

        //if(optionalFuncionario.isEmpty()){
            //return funcionarioRepository.save(funcionario);
        //} else {
            //throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Funcionario Já cadastrado!");
        //}
    //}

   // public void remove(Funcionario funcionario){
       // Optional<List<Funcionario>> optionalFuncionario = funcionarioRepository.findByNameIgnoreCase(funcionario.getName());
       // if(optionalFuncionario.isEmpty()){
       //     throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Funcionario não encontrado!");
       // } else {
       //     funcionarioRepository.delete(funcionario);
       // }
   // }
}

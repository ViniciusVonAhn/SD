package br.org.senac.funcionarioservice.controller;

import br.org.fiergs.ccor.data.rest.controller.BaseEndpoint;
import br.org.senac.funcionarioservice.entity.Funcionario;
import br.org.senac.funcionarioservice.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/funcionarios", produces = MediaType.APPLICATION_JSON_VALUE)
public class FuncionarioController extends BaseEndpoint<Funcionario, Long> {

    @Autowired
    private FuncionarioService funcionarioService;

    @Override
    @PutMapping(value = {"/{id}", "/{id}/"}, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Funcionario> update(@PathVariable Long id, @RequestBody @Valid Funcionario funcionario) {
        return new ResponseEntity<>(funcionarioService.edit(funcionario), HttpStatus.OK);
    }

    @Override
    @PostMapping(value = {"", "/"}, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Funcionario> create(@RequestBody @Valid Funcionario funcionario) {
        return new ResponseEntity<>(funcionarioService.save(funcionario), HttpStatus.OK);
    }

    //@GetMapping
    //public List<Funcionario> findAll(){
        //return funcionarioService.findAll();
    //}

    //@GetMapping("/{name}")
    //public Optional<Funcionario> findAllByName(@PathVariable String name){
        //return funcionarioService.findByName(name);
    //}

    //@PostMapping
    //public ResponseEntity<Funcionario> save(@RequestBody @Valid Funcionario funcionario){
     //   return new ResponseEntity<>(funcionarioService.save(funcionario), HttpStatus.OK);
    //}

    //@PutMapping("/{id}")
    //public ResponseEntity<Funcionario> edit(@PathVariable Long id, @RequestBody @Valid Funcionario funcionario){
   //     return new ResponseEntity<>(funcionarioService.edit(funcionario), HttpStatus.OK);
    //}

    //@DeleteMapping("/{id}")
    //public void remove(@PathVariable Long id, @RequestBody @Valid Funcionario funcionario){
    //    funcionarioService.remove(funcionario);
    //}
}

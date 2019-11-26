package br.org.senac.hotelservice.controllers;

import br.org.fiergs.ccor.data.rest.controller.BaseEndpoint;
import br.org.senac.hotelservice.entities.Hotel;
import br.org.senac.hotelservice.services.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/hoteis", produces = MediaType.APPLICATION_JSON_VALUE)
public class HotelController extends BaseEndpoint<Hotel, Long> {

    @Autowired
    private HotelService hotelService;

    @Override
    @PutMapping(value = {"/{id}", "/{id}/"}, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Hotel> update(@PathVariable Long id, @RequestBody @Valid Hotel hotel) {
        return new ResponseEntity<>(hotelService.edit(hotel), HttpStatus.OK);
    }

    @Override
    @PostMapping(value = {"", "/"}, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Hotel> create(@RequestBody @Valid Hotel hotel) {
        return new ResponseEntity<>(hotelService.save(hotel), HttpStatus.OK);
    }

    //@GetMapping
    //public List<Hotel> findAll(){
        //return hotelService.findAll();
    //}

    //@GetMapping("/{name}")
    //public Optional<Hotel> findAllByName(@PathVariable String name){
        //return hotelService.findByName(name);
    //}

    //@PostMapping
    //public ResponseEntity<Hotel> save(@RequestBody @Valid Hotel hotel){
        //return new ResponseEntity<>(hotelService.save(hotel), HttpStatus.OK);
    //}

    //@PutMapping("/{id}")
    //public ResponseEntity<Hotel> edit(@PathVariable Long id, @RequestBody @Valid Hotel hotel){
        //return new ResponseEntity<>(hotelService.edit(hotel), HttpStatus.OK);
    //}
}

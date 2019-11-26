package br.org.senac.hotelservice.services;

import br.org.senac.hotelservice.entities.Hotel;
import br.org.senac.hotelservice.repositories.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    //public List<Hotel> findAll(){
        //return hotelRepository.findAll();
    //}

    //public Optional<Hotel> findByName(String name){
        //return hotelRepository.findAllByNameContainingIgnoreCase(name);
    //}

    public Hotel save(Hotel hotel){
        Optional<List<Hotel>> hotelExists = hotelRepository.findByNameIgnoreCase(hotel.getName());

        if(hotelExists.isEmpty()){
            return hotelRepository.save(hotel);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Hotel já cadastrado!");
        }
    }

    public Hotel edit(Hotel hotel){
        Optional<List<Hotel>> hotelExists = hotelRepository.findAllByNameIgnoreCaseAndIdIsNot(hotel.getName(), hotel.getId());

        if(hotelExists.isEmpty()){
            return hotelRepository.save(hotel);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Hotel Já cadastrado!");
        }
    }
}

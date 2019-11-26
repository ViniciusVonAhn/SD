package br.org.senac.hotelservice.repositories;

import br.org.fiergs.ccor.data.jpa.repository.BaseRepository;
import br.org.senac.hotelservice.entities.Hotel;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface HotelRepository extends BaseRepository<Hotel, Long> {

    //Optional<Hotel> findAllByNameContainingIgnoreCase(String name);

    //Optional<Hotel> findAllByNameIgnoreCaseAndIdIsNot(String name, Long id);

    //Optional<List<Hotel>> findByNameIgnoreCase(String name);

    //Optional<List<Hotel>> findOneByNameIgnoreCaseAndIdNot(String name, Long id);



    @Query(value = "SELECT * FROM HOTEL " +
            "WHERE CONVERT(upper(name), 'SF7ASCII') = CONVERT(upper(:name), 'SF7ASCII')", nativeQuery = true)
    Optional<List<Hotel>> findByNameIgnoreCase(String name);

    @Query(value = "SELECT * FROM HOTEL " +
            "WHERE (CONVERT(upper(name), 'SF7ASCII') = CONVERT(upper(:name), 'SF7ASCII')) "+
            "AND id <> :id", nativeQuery = true)
    Optional<List<Hotel>> findAllByNameIgnoreCaseAndIdIsNot(String name, Long id);
}

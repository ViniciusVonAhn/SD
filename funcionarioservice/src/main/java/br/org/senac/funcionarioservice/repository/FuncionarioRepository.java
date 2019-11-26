package br.org.senac.funcionarioservice.repository;

import br.org.fiergs.ccor.data.jpa.repository.BaseRepository;
import br.org.senac.funcionarioservice.entity.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FuncionarioRepository extends BaseRepository<Funcionario, Long> {

    //Optional<Funcionario> findAllByNameContainingIgnoreCase(String name);

    //Optional<Funcionario> findAllByNameIgnoreCaseAndIdIsNot(String name, Long id);

    //Optional<List<Funcionario>> findByNameIgnoreCase(String name);

    //Optional<List<Funcionario>> findOneByNameIgnoreCaseAndIdNot(String name, Long id);

    @Query(value = "SELECT * FROM FUNCIONARIO " +
            "WHERE CONVERT(upper(name), 'SF7ASCII') = CONVERT(upper(:name), 'SF7ASCII')", nativeQuery = true)
    Optional<List<Funcionario>> findByNameIgnoreCase(String name);

    @Query(value = "SELECT * FROM FUNCIONARIO " +
            "WHERE (CONVERT(upper(name), 'SF7ASCII') = CONVERT(upper(:name), 'SF7ASCII')) "+
            "AND id <> :id", nativeQuery = true)
    Optional<List<Funcionario>> findAllByNameIgnoreCaseAndIdIsNot(String name, Long id);
}

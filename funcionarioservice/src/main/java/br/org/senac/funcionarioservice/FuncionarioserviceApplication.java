package br.org.senac.funcionarioservice;

import br.org.fiergs.ccor.data.jpa.repository.BaseRepositoryImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(
        repositoryBaseClass = BaseRepositoryImpl.class)
public class FuncionarioserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(FuncionarioserviceApplication.class, args);
    }

}

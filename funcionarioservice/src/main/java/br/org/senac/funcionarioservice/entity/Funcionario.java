package br.org.senac.funcionarioservice.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.Arrays;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "FUNCIONARIO")
@Inheritance(strategy = InheritanceType.JOINED)
@SequenceGenerator(name = "seq_Funcionario", sequenceName = "CCFUNCIONARIO", allocationSize = 1)
public class Funcionario implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seq_Funcionario")
    private Long id;

    @NotNull(message = "Nome é obrigatório")
    private String name;

    @NotNull(message = "CPF é obrigatório")
    private String cpf;

    @NotNull(message = "Idade é obrigatória")
    private Integer age;

    private Long hotel;

    @PreUpdate
    @PrePersist
    private void prePersist() {
        Field[] fields = this.getClass().getDeclaredFields();
        Arrays.stream(fields).filter(field -> field.getType().equals(String.class)).forEach(field -> {
            try {
                field.setAccessible(true);
                if (field.get(this) != null) {
                    String obj = field.get(this).toString();
                    field.set(this, obj != null ? obj.toUpperCase() : "");
                }
            } catch (IllegalAccessException e) {
                System.out.println("ERRO");
            }
        });
    }
}

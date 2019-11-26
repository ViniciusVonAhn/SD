package br.org.senac.hotelservice.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.Arrays;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "HOTEL")
@SequenceGenerator(name = "seq_Hotel", sequenceName = "HOTEL_SEQ", allocationSize = 1)
public class Hotel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seq_Hotel")
    private Long id;

    @NotNull(message = "Nome é obrigatório")
    private String name;

    @NotNull(message = "CNPJ é obrigatório")
    private String cnpj;

    @NotNull(message = "Cidade é obrigatória")
    private String city;

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

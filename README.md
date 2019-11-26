# Sistemas Distribuidos

## Atividade

**Utilizar micro-serviços com backend em Java e Spring Boot, Angular no frontend e Javascript para fazer a comunicação entre
ambos (BFF).
Sistemas web gerenciador de hotéis e funcionários, tem como objetivo, cadastrar, editar, excluir e pesquisar por hotéis e seus
funcionários.**

**Requisitos Funcionais Hotel:**

* RF01 – Cadastrar
* RF02 – Editar
* RF03 – Excluir
* RF04 – Buscar

**Requisitos Funcionais Funcionário:**

* RF01 – Cadastrar
* RF02 – Editar
* RF03 – Excluir
* RF04 – Buscar

### Diagrama ER
![](https://uploaddeimagens.com.br/images/002/515/962/original/ER.png)

## Protótipos de telas

### Listagem de hotéis
![](https://uploaddeimagens.com.br/images/002/515/979/original/ListaHoteis.png)

### Cadastro de hotéis
![](https://uploaddeimagens.com.br/images/002/515/984/original/CadastroHoteis.png)

### Listagem de funcionários
![](https://uploaddeimagens.com.br/images/002/515/987/original/ListaFuncionarios.png)

### Cadastro de funcionários
![](https://uploaddeimagens.com.br/images/002/515/994/full/CadastroFuncionarios.png)

## CÓDIGOS

### FRONT-END - ANGULAR

##### ENV - Aqui eu seto qual o caminho para o meu bff e os paths referentes aos meus dois serviços.

```
 urlBffConect: 'http://localhost',
  paths: {
    funcionario: '/funcionarios',
    hotel: '/hoteis'
    }
```

##### Na parte abaixo chamo o método postGeneric dentro do meu service passando path do hotel e o valor do meu formulário que será cadastrado.
```
this.bffService.postGeneric(environment.paths.hotel, this.hotelForm.value).then(res => {
          Globals.showToaster('Hotel', this.toasterService, res);
          this.blockUi.stop();
          if (res.statusCode === 200) {
            this.router.navigate([ '/hotel' ]);
          }
        }).catch(error => {
          this.blockUi.stop();
          this.toasterService.pop('error', 'Request', 'Erro interno.');
          console.error(error);
        });
```

##### Agora temos o método que foi chamado anteriormente, é ele o responsável por enviar via post para o bff. o método post do http recebe três parametros, que são eles:
##### environment.urlBffConect: cujo seu valor é 'http://localhost' que foi setado na primeira linha do primeiro trecho de código que foi mostrado.
##### path: cujo seu valor é '/hoteis' que foi setado na quarta linha do primeiro trecho de código que foi mostrado.
##### object: Como o próprio nome já indica, é o formulário em JSON.
```
postGeneric(path: string, object: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(environment.urlBffConect + path + '/', object).subscribe(res => {
        resolve(res as any);
      }, erro => {
        reject(erro as any);
      });
    });
  }
```

### BFF - NODEJS

##### ENV - Aqui eu seto a porta onde o server será exibido, o url do meu serviço, que no caso é o meu próprio localhost e o path para identificar onde estão os meus serviços(back-end).
```
PORT = 80

URL_LOCAL = http://localhost:

PATH_HOTEL = 9099/hoteis/
PATH_FUNCIONARIO = 9098/funcionarios/

```

##### No código abaixo é mostrado o controller onde ele recebe a requisição no front-end e armazena o body(corpo) dentro da variavel hotel e envia essa variavel que agora contém o corpo da requisição para o service.
```
exports.postHotel = async (req, res, next) => {
    let hotel = req.body;
    await hotelService.postHotel(hotel)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
        })
}
```

##### Agora no service nós recebemos o corpo da requisição e caso necessário, podemos fazer um tratamento nessa requisição, e em seguida enviamos essa requisição para o repository.
```
exports.postHotel = async (hotel) => {
    let result;
    if (hotel) {
        await hotelRepository.postHotel(hotel)
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
```

##### No repository nós recebemos a requisição e enviaremos para o postData que é um método genérico que recebo três parametros, que são eles:
##### process.env.URL_LOCAL: cujo seu valor é 'http://localhost:' que foi setado na primeira linha de código no módulo BFF.
##### process.env.PATH_HOTEL: cujo seu valor é '9099/hoteis/' que foi setado na terceira linha de código no módulo BFF.
##### data: Parametro recebido pelo service.
```
exports.postHotel = async (data) => {
    return new Promise(async (resolve, reject) => {
        await generic.postData(process.env.URL_LOCAL, process.env.PATH_HOTEL, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}
```

##### Método genérico responsável por enviar os dados para o backend.
```
postData: async function (url, path, data) {
        let result;
        await postFunc(url, path, data).then(response => {
            result = response
        });
        return result;
    },
```

### BACK-END - JAVA

##### Controller, responsável por receber os dados e enviar para o service
```
@PostMapping(value = {"", "/"}, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Hotel> create(@RequestBody @Valid Hotel hotel) {
        return new ResponseEntity<>(hotelService.save(hotel), HttpStatus.OK);
    }
```

##### Service, responsável por validar os dados e realizar a criação de um novo hotel.
```
public Hotel save(Hotel hotel){
        Optional<List<Hotel>> hotelExists = hotelRepository.findByNameIgnoreCase(hotel.getName());

        if(hotelExists.isEmpty()){
            return hotelRepository.save(hotel);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Hotel já cadastrado!");
        }
    }
```

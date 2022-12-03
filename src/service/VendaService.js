import axios from 'axios';

export class VendaService {
    url = 'http://localhost:8080/api/venda';

    listarTodos() {
        return axios.get(this.url);
    }

    inserir(objeto) {
        return axios.post(this.url + '/cadastrar', objeto);
    }

    excluir(id) {
        return axios.delete(this.url + '/deletar/' + id);
    }
}

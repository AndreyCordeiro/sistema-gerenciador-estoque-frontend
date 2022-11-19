import axios from 'axios';

export class FabricanteService {
    url = 'http://localhost:8080/api/fabricante';

    listarTodos() {
        return axios.get(this.url);
    }

    inserir(objeto) {
        return axios.post(this.url + '/cadastrar', objeto);
    }

    alterar(objeto) {
        return axios.put(this.url + '/atualizar/' + objeto.id, objeto);
    }

    excluir(id) {
        return axios.delete(this.url + '/deletar/' + id);
    }
}

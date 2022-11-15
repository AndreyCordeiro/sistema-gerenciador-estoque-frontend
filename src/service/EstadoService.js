import axios from 'axios';
import { ServiceBase } from './ServiceBase';

export class EstadoService extends ServiceBase {

    constructor() {
        super("estado");
    }

    url = 'http://localhost:8080/api/estado';


    listarTodos() {
        return axios.get(this.url);
    }

    buscarId(id) {
        return axios.get(this.url + id);
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

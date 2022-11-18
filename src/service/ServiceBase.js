import axios from 'axios';

export class ServiceBase {


    constructor(urlBase) {
        this.url = 'http://localhost:8080/api/'+urlBase+'/'; 
    }


    listarTodos() {
        return axios.get(this.url);
    }

    buscarId(id) {
        return axios.get(this.url + id);
    }

    inserir(objeto) {
        return axios.post(this.url, objeto);
    }

    alterar(objeto) {
        return axios.put(this.url, objeto);
    }

    excluir(id) {
        return axios.delete(this.url + id);
    }
}
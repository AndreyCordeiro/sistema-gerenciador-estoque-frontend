import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Toast} from 'primereact/toast';
import {Toolbar} from 'primereact/toolbar';
import React, {useEffect, useRef, useState} from 'react';
import {ProdutoService} from '../service/ProdutoService';
import ColunaOpcoes from "../components/ColunaOpcoes";
import {ClienteService} from "../service/ClienteService";
import {UsuarioService} from "../service/UsuarioService";
import {VendaService} from "../service/VendaService";

const Venda = () => {
    let objetoNovo = {
        usuario: '',
        cliente: '',
        produto: '',
    };

    const [objetos, setObjetos] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [produto, setProduto] = useState(null);
    const [objetoDialog, setObjetoDialog] = useState(false);
    const [objetoDeleteDialog, setObjetoDeleteDialog] = useState(false);
    const [objeto, setObjeto] = useState(objetoNovo);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const objetoService = new ProdutoService();
    const clienteService = new ClienteService();
    const usuarioService = new UsuarioService();
    const vendaService = new VendaService();

    useEffect(() => {
        clienteService.listarTodos().then(res => {
            setCliente(res.data)

        });

        usuarioService.listarTodos().then(res => {
            setUsuario(res.data)

        });

        objetoService.listarTodos().then(res => {
            setProduto(res.data)

        });
    }, []);

    useEffect(() => {
        if (objetos == null) {
            vendaService.listarTodos().then(res => {
                setObjetos(res.data)
            });
        }
    }, [objetos]);

    const openNew = () => {
        setObjeto(objetoNovo);
        setSubmitted(false);
        setObjetoDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setObjetoDialog(false);
    }

    const hideDeleteObjetoDialog = () => {
        setObjetoDeleteDialog(false);
    }

    const saveObjeto = () => {
        setSubmitted(true);
        console.log(objeto);

        if (objeto.nome.trim()) {
            let _objeto = {...objeto};
            if (objeto.id) {
                objetoService.alterar(_objeto).then(data => {
                    toast.current.show({severity: 'success', summary: 'Sucesso', detail: 'Alterado com Sucesso', life: 3000});
                    setObjetos(null);
                });
            } else {
                objetoService.inserir(_objeto).then(data => {
                    toast.current.show({severity: 'success', summary: 'Sucesso', detail: 'Inserido com Sucesso', life: 3000});
                    setObjetos(null);
                });
            }
            setObjetoDialog(false);
            setObjeto(objetoNovo);
        }
    }

    const editObjeto = (objeto) => {
        setObjeto({...objeto});
        setObjetoDialog(true);
    }

    const confirmDeleteObjeto = (objeto) => {
        setObjeto(objeto);
        setObjetoDeleteDialog(true);
    }

    const deleteObjeto = () => {
        objetoService.excluir(objeto.id).then(data => {
            toast.current.show({severity: 'success', summary: 'Sucesso', detail: 'Removido', life: 3000});

            setObjetos(null);
            setObjetoDeleteDialog(false);

        });
    }

    const onInputChange = (e, name) => {
        console.log(e.target.value);
        const val = (e.target && e.target.value) || '';
        let _objeto = {...objeto};
        _objeto[`${name}`] = val;

        setObjeto(_objeto);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Realizar venda" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew}/>
                </div>
            </React.Fragment>
        )
    }

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">ID</span>
                {rowData.id}
            </>
        );
    }

    const nomeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nome</span>
                {rowData.nome}
            </>
        );
    }

    const descricaoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Descrição</span>
                {rowData.descricao}
            </>
        );
    }

    const valorCustoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Valor de Custo</span>
                {rowData.valorCusto}
            </>
        );
    }

    const valorVendaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Valor de Venda</span>
                {rowData.valorVenda}
            </>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Registros Cadastrados</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..."/>
            </span>
        </div>
    );

    const objetoDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveObjeto}/>
        </>
    );

    const deleteObjetoDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteObjetoDialog}/>
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteObjeto}/>
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast}/>
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={objetos}
                               dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Mostrando {first} de {last}. Total de {totalRecords}"
                               globalFilter={globalFilter} emptyMessage="Sem objetos cadastrados." header={header} responsiveLayout="scroll">
                        <Column field="id" header="ID" sortable body={idBodyTemplate} headerStyle={{width: '14%', minWidth: '10rem'}}></Column>
                        <Column field="nome" header="Nome" sortable body={nomeBodyTemplate} headerStyle={{width: '14%', minWidth: '10rem'}}></Column>
                        <Column field="descricao" header="Descrição" sortable body={descricaoBodyTemplate} headerStyle={{width: '14%', minWidth: '10rem'}}></Column>
                        <Column field="valorCusto" header="Valor de Custo" sortable body={valorCustoBodyTemplate} headerStyle={{width: '14%', minWidth: '10rem'}}></Column>
                        <Column field="valorVenda" header="Valor de Venda" sortable body={valorVendaBodyTemplate} headerStyle={{width: '14%', minWidth: '10rem'}}></Column>
                        <Column body={rowData => {
                            return <ColunaOpcoes rowData={rowData} editObjeto={editObjeto} confirmDeleteObjeto={confirmDeleteObjeto}/>
                        }}></Column>
                    </DataTable>

                    <Dialog visible={objetoDialog} style={{width: '450px'}} header="Cadastrar/Editar" modal className="p-fluid" footer={objetoDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="usuario">Vendedor</label>
                            <Dropdown optionLabel="nome" value={objeto.usuario} options={usuario} filter onChange={(e) => onInputChange(e, 'usuario')} placeholder="Selecione um Vendedor"/>
                        </div>

                        <div className="field">
                            <label htmlFor="cliente">Cliente</label>
                            <Dropdown optionLabel="nome" value={objeto.cliente} options={cliente} filter onChange={(e) => onInputChange(e, 'cliente')} placeholder="Selecione um Cliente"/>
                        </div>

                        <div className="field">
                            <label htmlFor="produto">Produto</label>
                            <Dropdown optionLabel="nome" value={objeto.produto} options={produto} filter onChange={(e) => onInputChange(e, 'produto')} placeholder="Selecione um Produto"/>
                        </div>
                    </Dialog>
                    <Dialog visible={objetoDeleteDialog} style={{width: '450px'}} header="Confirmação" modal footer={deleteObjetoDialogFooter} onHide={hideDeleteObjetoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                            {objeto && <span>Deseja Excluir?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Venda, comparisonFn);

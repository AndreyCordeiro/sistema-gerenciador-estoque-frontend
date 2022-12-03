import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {Route, useLocation} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import {AppTopbar} from './AppTopbar';
import {AppFooter} from './AppFooter';
import {AppMenu} from './AppMenu';
import {AppConfig} from './AppConfig';

import Dashboard from './components/Dashboard';

import PrimeReact from 'primereact/api';
import {Tooltip} from 'primereact/tooltip';

import Permissao from './pages/Permissao';
import Produto from './pages/Produto';
import Categoria from './pages/Categoria';
import Fabricante from './pages/Fabricante';


import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.scss';
import Usuario from "./pages/Usuario";
import Venda from "./pages/Venda";
import Cliente from "./pages/Cliente";
import {LoginService} from "./service/LoginService";
import Login from "./pages/Login";
import SolicitarCodigo from "./pages/SolicitarCodigo";
import RecuperarSenha from "./pages/RecuperarSenha";


const App = () => {
    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();
    const loginService = new LoginService();

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const menu = [
        {
            label: 'Home',
            items: [{
                label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'
            }]
        },
        {
            label: 'Cadastros',
            items: [
                {
                    label: 'Fabricantes', icon: 'pi pi-building', to: '/fabricantes'
                },
                {
                    label: 'Categorias', icon: 'pi pi-tags', to: '/categorias'
                },
                {
                    label: 'Produtos', icon: 'pi pi-box', to: '/produtos'
                },
                {
                    label: 'Permissões', icon: 'pi pi-lock-open', to: '/permissoes'
                },
                {
                    label: 'Usuários', icon: 'pi pi-users', to: '/usuarios'
                },
                {
                    label: 'Clientes', icon: 'pi pi-shopping-bag', to: '/clientes'
                },
                {
                    label: 'Vendas', icon: 'pi pi-wallet', to: '/vendas'
                },
            ]
        }
    ];

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });

    const Pagina = () => {
        return (
            <div className={wrapperClass} onClick={onWrapperClick}>
                <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus"/>

                <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                           mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}/>

                <div className="layout-sidebar" onClick={onSidebarClick}>
                    <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode}/>
                </div>

                <div className="layout-main-container">
                    <div className="layout-main">
                        <Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} location={location}/>}/>
                        <Route path="/fabricantes" component={Fabricante}/>
                        <Route path="/categorias" component={Categoria}/>
                        <Route path="/produtos" component={Produto}/>
                        <Route path="/permissoes" component={Permissao}/>
                        <Route path="/usuarios" component={Usuario}/>
                        <Route path="/vendas" component={Venda}/>
                        <Route path="/clientes" component={Cliente}/>
                    </div>

                    <AppFooter layoutColorMode={layoutColorMode}/>
                </div>

                <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                           layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange}/>

                <CSSTransition classNames="layout-mask" timeout={{enter: 200, exit: 200}} in={mobileMenuActive} unmountOnExit>
                    <div className="layout-mask p-component-overlay"></div>
                </CSSTransition>
            </div>
        );
    }

    return (
        <div>
            {
                loginService.autenticado() ?
                    <Pagina/>
                    :
                    <Login/>
                    // [
                    //     <Login/>,
                    //     <SolicitarCodigo/>,
                    //     <RecuperarSenha/>
                    // ]
            }
        </div>
    );
}

export default App;

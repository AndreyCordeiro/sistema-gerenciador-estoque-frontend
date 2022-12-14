import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {LoginService} from "./service/LoginService";

export const AppTopbar = (props) => {
    const loginService = new LoginService();

    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <span>S.G.E</span>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v"/>
            </button>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive})}>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-calendar"/>
                        <span>Events</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-cog"/>
                        <span>Settings</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={() => loginService.sair()}>
                        <i className="pi pi-sign-out"/>
                        <span>Sair</span>
                    </button>
                </li>
            </ul>
        </div>
    );
}

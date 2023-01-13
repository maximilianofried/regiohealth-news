import React from 'react';
import { NavLink } from 'react-router-dom';
import FontAwesome from '../uiStyle/FontAwesome';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Dropdown = ({ menus }) => {
    return menus.map((item) => (
        <li key={item.id} className="nav-item">
            <NavLink
                to={item.link}
                className="menu-dropdown nav-menu-link text-decoration-none"
                data-toggle="dropdown"
            >
                {item.linkText}{' '}
                {item.linkText === 'angebote' ? (
                    <img
                        className="angebote-icon"
                        src="https://cms.gesundheitsticket.de/uploads/icon_app_25b83c377e.png"
                        alt="author2"
                    />
                ) : null}{' '}
            </NavLink>
        </li>
    ));
};

export default Dropdown;

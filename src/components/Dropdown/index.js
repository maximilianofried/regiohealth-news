import React from 'react';
import { NavLink } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FontAwesome from '../uiStyle/FontAwesome';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Dropdown = ({ menus }) => {
    return menus.map((item) => (
        <li
            key={item.id}
            className={`${item.child ? 'dropdown' : ''} nav-item`}
        >
            {item.child ? (
                <NavLink
                    onClick={(e) => e.preventDefault()}
                    to="/"
                    className="menu-dropdown"
                    data-toggle="dropdown"
                >
                    {item.linkText}
                    <FontAwesome name={item.icon} />
                </NavLink>
            ) : (
                <NavLink
                    to={item.link}
                    className="menu-dropdown"
                    data-toggle="dropdown"
                >
                    {item.linkText}{' '}
                    {item.linkText === 'angebote' ? (
                        <LazyLoadImage
                            className="angebote-icon"
                            src="https://strapi-sandbox.gesundheitsticket.de/uploads/icon_app_7bc6820dc7.png"
                            alt="author2"
                            //   effect="blur"
                        />
                    ) : null}{' '}
                </NavLink>
            )}

            {item.child ? (
                <ul className="dropdown-menu" role="menu">
                    {item.submenu.map((subItem) => (
                        <li
                            key={subItem.id}
                            className={`${
                                subItem.child ? 'dropdown-submenu' : null
                            }
              `}
                        >
                            {subItem.child ? (
                                <NavLink
                                    onClick={(e) => e.preventDefault()}
                                    to="/"
                                >
                                    {subItem.linkText}
                                </NavLink>
                            ) : (
                                <NavLink to={subItem.link}>
                                    {subItem.linkText}
                                </NavLink>
                            )}
                            {subItem.third_menu ? (
                                <ul className="dropdown-menu">
                                    {subItem.thirdMenu.map((thirdItem) => (
                                        <li key={thirdItem.id}>
                                            <NavLink to={thirdItem.link}>
                                                {thirdItem.linkText}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </li>
                    ))}
                </ul>
            ) : null}
        </li>
    ));
};

export default Dropdown;

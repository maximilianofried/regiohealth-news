import React from 'react';
import { Link } from 'react-router-dom';

const quickLinks = [
    {
        name: 'About',
        link: '/about',
        id: 1,
    },
    {
        name: 'Advertise',
        link: '/advertise',
        id: 2,
    },
    {
        name: 'Privacy & Policy',
        link: '/privacypolicy',
        id: 3,
    },
    {
        name: 'Contact Us',
        link: '/contact',
        id: 4,
    },
];

const FooterCopyright = () => {
    return (
        <div className="copyright">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 align-self-center">
                        <p>&copy; Copyright 2020, All Rights Reserved</p>
                    </div>
                    <div className="col-lg-6 align-self-center">
                        <div className="copyright_menus text-right">
                            <div className="language" />
                            <div className="copyright_menu inline">
                                <ul>
                                    {quickLinks.map((item) => (
                                        <li key={item.id}>
                                            <Link to={item.link}>
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterCopyright;

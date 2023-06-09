import React from 'react';
import { Link } from 'react-router-dom';

const FooterCopyright = ({ pagesMenu }) => {
    return (
        <div className="copyright">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 align-self-center">
                        <div className="copy_text">
                            &copy; Copyright 2021, All Rights Reserved
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 align-self-center">
                        <div className="copyright_menus text-right">
                            <div className="language" />
                            <div className="copyright_menu inline">
                                <ul>
                                    {pagesMenu.map((item) => (
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

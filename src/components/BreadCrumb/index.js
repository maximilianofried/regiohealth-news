import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ className = '', title, children }) => {
    return (
        <div className={`inner_table ${className}`}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="bridcrumb">
                            <Link to="/">Home</Link> / {title}
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default BreadCrumb;

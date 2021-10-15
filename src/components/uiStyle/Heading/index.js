import React from 'react';

const Heading = ({ className, title }) => {
    return (
        <div className={`heading ${className || ''}`}>
            <h2 className="widget-title">{title}</h2>
        </div>
    );
};

export default Heading;

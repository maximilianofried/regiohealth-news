import React from 'react';

const FontAwesome = ({ name = '', ...rest }) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <i {...rest} className={`fa fa-${name}`} />;
};

export default FontAwesome;

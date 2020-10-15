import React from 'react';
import { Helmet } from 'react-helmet';
import { RG_LOGO } from '../../utils/constants';

const Metadata = ({
    title = '',
    description = 'Regio Health News',
    image = RG_LOGO,
    url = process.env.REACT_APP_BASE_PAGE_URL,
} = {}) => {
    const urlLowerCase = url.toLowerCase();

    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{`Regio Health News - ${title}`}</title>
            <link rel="canonical" href={urlLowerCase} />
            <meta
                name="description"
                content={`Regio Health News - ${description}`}
            />
            <meta
                property="og:title"
                content={`Regio Health News - ${title}`}
            />
            <meta
                property="og:description"
                content={`Regio Health News - ${description}`}
            />
            <meta property="og:image" itemProp="image" content={image} />
            <meta
                property="og:image:secure_url"
                itemProp="image"
                content={image}
            />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:url" content={urlLowerCase} />
            <meta property="og:type" content="article" />
            <meta property="og:site_name" content="Regio Health News" />
        </Helmet>
    );
};

export default Metadata;

import React from 'react';
import { Helmet } from 'react-helmet';
import { RG_LOGO } from '../../utils/constants';

const Metadata = ({
    title = '',
    description = 'Regio Health News',
    image = RG_LOGO,
    imageSize = { width: 0, height: 0 },
    url = process.env.REACT_APP_BASE_PAGE_URL,
} = {}) => {
    const urlLowerCase = url.toLowerCase();
    const imageExtension =
        image.substring(image.lastIndexOf('.') + 1, image.length) || image;
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{`Regio Health News - ${title}`}</title>
            <link rel="canonical" href={urlLowerCase} />
            <meta name="description" content={description} />
            <meta
                property="og:title"
                content={`Regio Health News - ${title}`}
            />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={urlLowerCase} />
            <meta property="og:type" content="article" />
            <meta property="og:site_name" content="Regio Health News" />
            <meta
                property="og:image:secure_url"
                itemProp="image"
                content={image}
            />
            <meta property="og:image" itemProp="image" content={image} />
            <meta
                property="og:image:type"
                content={`image/${imageExtension}`}
            />
            <meta property="og:image:width" content={imageSize.width} />
            <meta property="og:image:height" content={imageSize.height} />
            <meta property="og:image:alt" content={title} />
            <meta property="fb:app_id" content="342431574212549" />
            <script>
                {`
                        var _paq = (window._paq = window._paq || []);
                        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
                        _paq.push(['trackPageView']);
                        _paq.push(['enableLinkTracking']);
                        (function () {
                            var u = 'https://analytics.gesundheitsticket.de/';
                            _paq.push(['setTrackerUrl', u + 'matomo.php']);
                            _paq.push(['setSiteId', '2']);
                            var d = document,
                                g = d.createElement('script'),
                                s = d.getElementsByTagName('script')[0];
                            g.async = true;
                            g.src = u + 'matomo.js';
                            s.parentNode.insertBefore(g, s);
                        })();
            `}
            </script>
        </Helmet>
    );
};

export default Metadata;

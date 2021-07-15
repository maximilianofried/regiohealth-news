import React from 'react';

const AdserverIframe = () => {
    return (
        <div className="banner2 border-radious5 banner_homepage mb20 mt20 mt-lg-0">
            <iframe
                title="adserver"
                id="a64f1ca8"
                name="a64f1ca8"
                src="https://adserver.gesundheitsticket.de/revive/www/delivery/afr.php?zoneid=1&amp;cb=INSERT_RANDOM_NUMBER_HERE"
                frameBorder="0"
                scrolling="no"
                width="308"
                height="257"
                allow="autoplay"
                className="iframe_style"
            >
                <a
                    href="https://adserver.gesundheitsticket.de/revive/www/delivery/ck.php?n=a75df846&amp;cb=INSERT_RANDOM_NUMBER_HERE"
                    target="_blank"
                >
                    <img
                        src="https://adserver.gesundheitsticket.de/revive/www/delivery/avw.php?zoneid=1&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;n=a75df846"
                        border="0"
                        alt=""
                    />
                </a>
            </iframe>
        </div>
    );
};

export default AdserverIframe;

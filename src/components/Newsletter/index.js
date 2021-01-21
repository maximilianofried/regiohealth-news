import React from 'react';
import FontAwesome from '../uiStyle/FontAwesome';

const NewsLetter = ({ className, inputWhite, titleClass }) => {
    return (
        <div className={`box widget news_letter mb30 ${className || ''}`}>
            <h2 className={`widget-title ${titleClass}`}>
                RegioHealth.NEWSLETTER
            </h2>
            <p>
                Abonnieren Sie hier die wöchentliche Zusammenfassung der
                interessantesten Beiträge.
            </p>
            <div className="newsletter">
                <ul className="inline">
                    <li>
                        <a
                            target="_blank"
                            href="https://479eae97.sibforms.com/serve/MUIEADSWDylT8D8OgTnMcV25um59XUPhc5k4mhMnNsnmZjdPO-now3kkr00XjVoC6FdrE3cS-xXfIj9Sk6Bclwn8pJiCD2tYlCpiviSkhDvcg3EcwCZSMNLbzICM3RiJ57diUgFwGyAMRkzUGa0DYEyLG56PnHP8c3pDMTcOhlL6HM9kF1mYTR5in6T0xLGXVnj2LmuBYbwWEs0H"
                        >
                            Abonnieren <FontAwesome name="newspaper-o" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NewsLetter;

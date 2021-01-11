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
                            href="https://479eae97.sibforms.com/serve/MUIEABvaG_MM21JAw8QsImj-sWdi4lVwK67sgudJVsYafLIXEMfwXS4woB57pfptvRoaNOKeT7hdpb9kWwBjfjAf9tm5OqfJ2krTQiTyUFj6VLuNaWmvQ46j05EWn724y3-qaKSgfHlApRwzpZJ07c5eAnj3DpLsOrs5_piQ42M4faevLccJOVgaSCcih2HVGbNutNegZwz0W0UI"
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

import React from 'react';
import FontAwesome from '../uiStyle/FontAwesome';

const NewsLetter = ({ className }) => {
    return (
        <div className={`box widget news_letter mb30 ${className || ''}`}>
            <p>
                Erhalten Sie eine regelmäßige Zusammenfassung der
                interessantesten Beiträge!
            </p>
            <div className="newsletter">
                <ul className="inline">
                    <li>
                        <a
                            target="_blank"
                            href="https://479eae97.sibforms.com/serve/MUIEAEvroLOl7gAeKgjfkbLkysmfsuAS3Tg6HJf6pH3obY0A938-9XXoyezLoftkDhOte_IPJ4UzRcIaiUwNZVuQPKYRpGLaLvT5TZ5udL7Bhv2Vlh9onojMKyw5UxBFiuAoIcA89fFusp3sdopMgDpkOXeSLuurQRJPPChbLNNYIGmg4-8iLrJQA8l6xcpt-8K9i8z56LepgN9j"
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

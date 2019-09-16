import React from 'react';
import menuIcon from '../../images/menu-icon.svg';

import ProcessMenu from './ProcessMenu';
import ProcessMenuBar from './ProcessMenuBar';

const KensanHeader = () => (
    <header className="kensanHeader">
        <div className="kensanHeader__buttonArea">
            <div className="menuButtonContainer">
                <button className="menuButton">
                    <img src={menuIcon} alt="menu" className="menuButton__image"/>
                </button>
            </div>
            <ProcessMenu />
        </div>
        <ProcessMenuBar />
    </header>
);

export default KensanHeader;
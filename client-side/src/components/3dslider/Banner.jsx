// src/Banner.js
import React from 'react';
import './Banner.css'; // Import the CSS file
import default_image from './images/dragon.jpg';
import AUTOMATE_image from './images/AUTOMATE.png';
import docx_image from './images/docx.png';
import model_image from './images/model.png';
import mYSQL_image from './images/mYSQL.png';
import pdf_image from './images/pdf.png';
import postgress_image from './images/postgress.png';
import SQLLITE_image from './images/SQLLITE.png';
import TXT_image from './images/TXT.png';

const Banner = () => {
    return (
        <div className='banner bg-gray-100'>
            <div className='slider' style={{ '--quantity': 5 }}>
                <div className='item' style={{ '--position': 1 }}>
                    <img src={pdf_image} alt='Dragon 1' />
                </div>
                <div className='item' style={{ '--position': 2 }}>
                    <img src={docx_image} alt='Dragon 2' />
                </div>
                <div className='item' style={{ '--position': 3 }}>
                    <img src={TXT_image} alt='Dragon 3' />
                </div>

                <div className='item' style={{ '--position': 4 }}>
                    <img src={AUTOMATE_image} alt='Dragon 5' />
                </div>

                <div className='item' style={{ '--position': 5 }}>
                    <img src={mYSQL_image} alt='Dragon 7' />
                </div>
            </div>
            <div className='content'>
                <h1 data-content='DATA DOC'>DATA DOC </h1>
                <p
                    className='flex items-center justify-center w-full  '
                    data-content=' EXPLORE THE BEST WAY TO TALK TO YOUR DATA.'
                >
                    {' '}
                    EXPLORE THE BEST WAY TO TALK TO YOUR DATA.
                </p>
                <div className='author'>
                    {/* <h2>LUN DEV</h2> */}
                    {/* <p>
                        <b>Web Design</b>
                    </p>
                    <p>
                        Subscribe to the channel to watch many interesting
                        videos
                    </p> */}
                </div>
                <div className='model'></div>
            </div>
        </div>
    );
};

export default Banner;

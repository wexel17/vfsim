import React from 'react';
import './TeamGrid.css';
import Hero from './Hero';

function TeamGrid() {
    return (
        <div className="TeamGrid">
            <Hero position="front_right"/>
            <Hero position="mid_right"  />
            <Hero position="back_right" />
            <Hero position="front_center"/>
            <Hero position="mid_center" />
            <Hero position="back_center"/>
            <Hero position="front_left" />
            <Hero position="mid_left"   />
            <Hero position="back_left"  />
        </div>
    );
}

export default TeamGrid;

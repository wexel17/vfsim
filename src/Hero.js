import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import './Hero.css';

function heroKey(hero) {
    return hero.name + ' ' + hero.className;
}

function Hero({ position, heroes, hitBreakdown, selectPosition, selectedPosition }) {
    const hero = heroes[position];
    if (hero) {
        const heroHits = hitBreakdown[heroKey(hero)];
        return (
            <div
                className={classNames('Hero', { 'Hero--selected' : position === selectedPosition })}
                onClick={selectPosition(position)}
            >
                <div className="Hero__Name">{hero.name}</div>
                <div className="Hero__Class">{hero.className}</div>
                <div className="Hero__Hits">{heroHits ? heroHits.mean.toFixed(1) : '?'} hits</div>
            </div>
        );
    } else {
        return (
            <div
                className={classNames('Hero', 'Hero--empty', { 'Hero--selected' : position === selectedPosition })}
                onClick={selectPosition(position)}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedPosition: state.selectedPosition,
        heroes: state.heroes,
        hitBreakdown: state.hitBreakdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        selectPosition: position => () => dispatch({ type: 'select_position', position })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hero);

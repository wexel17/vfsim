import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import heroes from './heroes';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Simulator  from "./simulator";
import Counter from "./counter";

const RESET = {
    turns: 0,
    hitTotal: new Counter(),
    hitBreakdown: {},
    damage: new Counter(),
};

let savedHeroes = {};

if (localStorage.heroes) {
    try {
        const heroData = JSON.parse(localStorage.heroes);
        if (typeof heroData === 'object') {
            Object.keys(heroData).forEach(position => {
                const data = heroData[position];
                const template = heroes.find(hero => hero.name === data.name && hero.className === data.className);
                if (template) {
                    savedHeroes[position] = Object.assign({}, template, data);
                }
            });
        }
    } catch (e) {
        console.error(e);
    }
}

const savedDefense = ('defense' in localStorage) ? Number(localStorage.defense) : 1000;

const INITIAL_STATE = Object.assign({
    heroes: savedHeroes,
    defense: savedDefense,
    defenseInput: savedDefense,
    maxHits: 100,
    standOn: 100,
}, RESET);

const MAX_TURNS = 1E6;

function saveHeroes(heroes) {
    const heroData = {};
    Object.entries(heroes).forEach(([position, hero]) => {
        heroData[position] = {
            name: hero.name,
            className: hero.className,
            attack: hero.attack,
            defense: hero.defense,
            magic: hero.magic,
            hp: hero.hp,
            crit: hero.crit,
            rune: hero.rune,
        };
    });
    localStorage.heroes = JSON.stringify(heroData);
}

function increment(state) {
    const sim = new Simulator(state.heroes, state.defense);
    const hits = new Counter();
    const damage = new Counter();
    const timeout = window.performance.now() + 50;
    let turnsTaken = 0;
    do {
        sim.processAction('start_turn');
        let hero = null;
        do {
            hero = sim.heroes.find(hero => hero.ready);
            if (hero) {
                sim.processAction('exhaust', hero);
                sim.processAction('hit', hero);
            }
        } while (sim.hits < state.standOn && hero);
        hits.add(sim.hits);
        damage.add(sim.damage);
        ++turnsTaken;
    } while (window.performance.now() < timeout && state.turns + turnsTaken < MAX_TURNS);
    const hitBreakdown = Object.assign({}, state.hitBreakdown);
    sim.heroes.forEach(hero => {
        const heroKey = hero.name + ' ' + hero.className;
        if (!hitBreakdown[heroKey]) {
            hitBreakdown[heroKey] = new Counter();
        }
        hitBreakdown[heroKey].add(hero.hits);
    });
    return Object.assign({}, state, {
        turns: state.turns + turnsTaken,
        damage: state.damage.combine(damage),
        hitTotal: state.hitTotal.combine(hits),
        hitBreakdown
    });
}

function changeHero(state, position, hero) {
    const newHeroes = Object.assign({}, state.heroes );
    newHeroes[position] = Object.assign({}, hero);
    saveHeroes(newHeroes);
    return Object.assign({}, state, RESET, { heroes: newHeroes });
}

function removeHero(state, position, hero) {
    const newHeroes = Object.assign({}, state.heroes );
    delete newHeroes[position];
    saveHeroes(newHeroes);
    return Object.assign({}, state, RESET, { heroes: newHeroes });
}

function changeHeroStat(state, position, stat, value) {
    const hero = state.heroes[position];
    if (hero) {
        const newHeroes = Object.assign({}, state.heroes );
        newHeroes[position] = Object.assign({}, hero, { [stat]: value });
        saveHeroes(newHeroes);
        return Object.assign({}, state, RESET, { heroes: newHeroes });
    }
}

function changeDefense(state, value) {
    localStorage.defense = value;
    return Object.assign({}, state, RESET, { defense: value });
}

function changeDefenseInput(state, value) {
    return Object.assign({}, state, { defenseInput: value });
}

function reduce(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'increment': return increment(state);
        case 'select_position': return Object.assign({}, state, { selectedPosition: action.position });
        case 'change_hero': return changeHero(state, action.position, action.hero);
        case 'remove_hero': return removeHero(state, action.position);
        case 'change_hero_stat': return changeHeroStat(state, action.position, action.stat, action.value);
        case 'change_defense': return changeDefense(state, action.value);
        case 'change_defense_input': return changeDefenseInput(state, action.value);
        default: return state;
    }
}

let store = createStore(reduce);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();

function advanceSimulation() {
    try {
        const state = store.getState();
        if (state && state.turns < MAX_TURNS) {
            store.dispatch({ type: 'increment' });
        }
    } catch (e) {
        console.error(e);
    }
    window.requestAnimationFrame(advanceSimulation);
}

window.requestAnimationFrame(advanceSimulation);
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import allHeroes from './heroes';
import NumberInput from './NumberInput';
import './Configure.css';

function createLabel(hero) {
    return hero.name + ' (' + hero.className + ')';
}

const HERO_OPTIONS = allHeroes
    .map(hero => ({
        label: createLabel(hero),
        value: hero
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

function Configure({ position, hero, changeHero, changeHeroStat, defense }) {
    if (position) {
        const selectedLabel = hero ? createLabel(hero) : 'NONE';
        const selectedOption = hero ? HERO_OPTIONS.find(o => o.label === selectedLabel) : null;
        return (
            <div className="Configure">
                <table><tbody>
                    <tr>
                        <th>Hero:</th>
                        <td>
                            <Select
                                options={HERO_OPTIONS}
                                value={selectedOption}
                                onChange={changeHero(position)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Attack:</th>
                        <td>
                            <NumberInput
                                key={selectedLabel}
                                disabled={!hero}
                                defaultValue={hero ? hero.attack : ''}
                                onChange={changeHeroStat(position, 'attack')}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th/>
                        <td className="Configure__info">
                            <span>Damage: {hero ? Math.max(1, hero.attack - defense) : '?'} </span>
                            <span>({hero ? Math.max(1, Math.round(hero.attack * 1.5 - defense)) : '?'} crit)</span>
                        </td>
                    </tr>
                    <tr>
                        <th>Crit:</th>
                        <td>
                            <NumberInput
                                key={selectedLabel}
                                disabled={!hero}
                                defaultValue={hero ? hero.crit : ''}
                                onChange={changeHeroStat(position, 'crit')}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th/>
                        <td className="Configure__info">
                            Crit rate: {hero ? Math.min(75, hero.crit / 91).toFixed(1) : '?'}%
                        </td>
                    </tr>
                </tbody></table>

                <div className="Configure__note">
                    Note: persistent auras and active skills are not simulated.
                </div>
            </div>
        );
    } else {
        return (
            <div className="Configure">
                Click a square on the grid to configure.
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        position: state.selectedPosition,
        hero: state.heroes[state.selectedPosition],
        defense: state.defense
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeHero: position => option => {
            if (option && option.value) {
                dispatch({ type: 'change_hero', hero: option.value, position });
            } else {
                dispatch({ type: 'remove_hero', position });
            }
        },
        changeHeroStat: (position, stat) => event => {
            if (event.target.validity.valid) {
                dispatch({ type: 'change_hero_stat', value: event.target.value, position, stat });
            }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Configure);

import React from 'react';
import { connect } from 'react-redux';
import NumberInput from './NumberInput';
import './Defense.css';

function Defense({ defense, defenseInput, changeDefenseRange, changeDefenseNumber }) {
    return (
        <div className="Defense">
            <label className="Defense__label">Defense:</label>
            <input
                type="range"
                className="Defense__range"
                min="0"
                max="10000"
                value={defense}
                onChange={changeDefenseRange}
            />
            <NumberInput
                key={defense}
                className="Defense__number"
                min="0"
                max="10000"
                value={defenseInput}
                onChange={changeDefenseNumber}
            />
        </div>
    );

}

function mapStateToProps(state) {
    return {
        defense: state.defense,
        defenseInput: state.defenseInput
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeDefenseRange: event => {
            dispatch({ type: 'change_defense_input', value: event.target.value });
            dispatch({ type: 'change_defense', value: event.target.value });
        },
        changeDefenseNumber: event => {
            dispatch({ type: 'change_defense_input', value: event.target.value });
            if (event.target.validity.valid) {
                dispatch({ type: 'change_defense', value: event.target.value })
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Defense);

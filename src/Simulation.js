import React from 'react';
import { connect } from 'react-redux';
import './Simulation.css';

function Simulation({ turns, hits, damage }) {
    if (!hits.mean) {
        return <div/>;
    }
    return (
        <table className="Simulation">
            <tbody>
                <tr>
                    <th>Hits per turn:</th>
                    <td>{hits.mean.toFixed(1)} [{hits.min}-{hits.max}]</td>
                </tr>
                <tr>
                    <th>Damage per turn:</th>
                    <td>
                        {Math.round(damage.mean).toLocaleString()}
                        {' '}
                        [{Math.round(damage.min).toLocaleString()}
                        -
                        {Math.round(damage.max).toLocaleString()}]
                    </td>
                </tr>
                <tr>
                    <th>Simulated turns:</th>
                    <td>{turns.toLocaleString()}</td>
                </tr>
            </tbody>
        </table>
    );

}

function mapStateToProps(state) {
    return {
        turns: state.turns,
        hits: state.hitTotal,
        damage: state.damage
    };
}

export default connect(mapStateToProps)(Simulation);

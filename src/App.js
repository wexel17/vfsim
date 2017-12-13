import React from 'react';
import './App.css';
import Defense from './Defense';
import TeamGrid from './TeamGrid';
import Simulation from './Simulation';
import Configure from './Configure';

function App() {
    return (
        <div className="App">
            <header className="App__Header">
                VF Simulator
            </header>
            <main className="App__Main">
                <section className="App__Results">
                    <TeamGrid/>
                    <Defense/>
                    <Simulation/>
                </section>
                <section className="App__Configure">
                    <Configure/>
                </section>
            </main>
        </div>
    );
}

export default App;

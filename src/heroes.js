export default [{
    name: 'Aladdin',
    className: 'Assassin',
    attack: 3607,
    defense: 2141,
    hp: 6670,
    crit: 3457,
    magic: 1033,
    triggerOn: 'self',
    triggerType: 'crit',
    triggerChance: 0.40,
    trigger(react, hero) {
        hero.allies.forEach(ally => {
            react('reset', ally);
        });
    }
}, {
    name: 'Aladdin',
    className: 'Ninja',
    attack: 3607,
    defense: 2141,
    hp: 6538,
    crit: 3457,
    magic: 1164,
    triggerOn: 'self',
    triggerType: 'hit',
    triggerChance: 0.75,
    trigger(react, hero) {
        // TODO
    }
}, {
    name: 'Cassandra',
    className: 'Assassin',
    attack: 3940,
    defense: 2339,
    hp: 7286,
    crit: 3776,
    magic: 1126,
    triggerOn: 'self',
    triggerType: 'skill',
    triggerChance: 0.95,
    trigger(react, hero) {
        react('heal', hero);
        react('crit', hero);
        hero.allies.forEach(ally => {
            react('heal', ally);
            react('crit', ally);
        });
    }
}, {
    name: 'Cassandra',
    className: 'Magebane',
    attack: 3653,
    defense: 2339,
    hp: 7286,
    crit: 3201,
    magic: 1990,
    triggerOn: 'self',
    triggerType: 'hp40',
    triggerChance: 0.95,
    trigger(react, hero) {
        react('stun', hero);
        react('accelerate', hero, 2);
        hero.allies.forEach(ally => {
            react('stun', ally);
            react('accelerate', ally, 2);
        });
    }
}, {
    name: 'Cassandra',
    className: 'Ninja',
    attack: 3940,
    defense: 2339,
    hp: 7142,
    crit: 3776,
    magic: 1272,
    triggerOn: 'ally',
    triggerType: 'hit',
    triggerChance: 0.50,
    trigger(react, hero) {
        react('stealth', hero);
        react('crit', hero);
    }
}, {
    name: 'Cassandra',
    className: 'Samurai',
    attack: 3509,
    defense: 3058,
    hp: 8004,
    crit: 3058,
    magic: 841,
}, {
    name: 'Cybella',
    className: 'Grand Ranger',
    attack: 3299,
    defense: 1920,
    hp: 5640,
    crit: 1815,
    magic: 824,
    triggerOn: 'self',
    triggerType: 'crit',
    triggerChance: 0.95,
    trigger(react, hero) {
        hero.allies.forEach(ally => {
            react('knockback', ally);
            react('hit', ally, 0.70);
        });
    }
}, {
    name: 'Cybella',
    className: 'Gunslinger',
    attack: 3405,
    defense: 1499,
    hp: 5535,
    crit: 1710,
    magic: 1349,
    triggerOn: 'self',
    triggerType: 'crit',
    triggerChance: 0.95,
    trigger(react, hero) {
        hero.allies.forEach(ally => {
            react('hit', ally, 1.00);
        });
    }
}, {
    name: 'Darrion',
    className: 'Blood Knight',
    attack: 4391,
    defense: 3325,
    hp: 9208,
    crit: 788,
    magic: 1470,
    triggerOn: 'self/ally',
    triggerType: 'hit',
    triggerChance: 1,
    trigger(react, hero, actor, damage) {
        react('heal', actor, damage * 0.30);
    }
}, {
    name: 'Drake',
    className: 'Dragoon',
    attack: 4509,
    defense: 1892,
    hp: 7515,
    crit: 1273,
    magic: 725,
    triggerOn: 'self',
    triggerType: 'heal',
    triggerChance: 0.30,
    trigger(react, hero) {
        react('hit', hero, 0.80);
    }
}, {
    name: 'Drake',
    className: 'Gladiator',
    attack: 4385,
    defense: 2634,
    hp: 7515,
    crit: 654,
    magic: 725,
    triggerOn: 'self/ally',
    triggerType: 'hit',
    triggerChance: 1,
    trigger(react, hero, actor, damage) {
        react('heal', actor, damage * 0.25);
    }
}, {
    name: 'Eliza',
    className: 'Dragoon',
    attack: 4630,
    defense: 1942,
    hp: 7717,
    crit: 1307,
    magic: 744,
    triggerOn: 'self/ally',
    triggerType: 'hit',
    triggerChance: 1,
    trigger(react, hero, actor, damage) {
        react('heal', actor, damage * 0.15);
    }
}, {
    name: 'Emilia',
    className: 'Inquisitor',
    attack: 2922,
    defense: 2331,
    hp: 5944,
    crit: 837,
    magic: 2742,
    triggerOn: 'ally',
    triggerType: 'heal',
    triggerChance: 0.40,
    trigger(react, hero) {
        react('hit', hero, 1.00);
    }
}, {
    name: 'Gwen',
    className: 'Gunslinger',
    attack: 3041,
    defense: 1463,
    hp: 6000,
    crit: 2667,
    magic: 1463,
    triggerOn: 'self',
    triggerType: 'crit',
    triggerChance: 0.95,
    trigger(react, hero) {
        hero.allies.forEach(ally => {
            react('hit', ally, 0.85);
        });
    }
}, {
    name: 'Kahuna',
    className: 'Spirit Walker',
    attack: 2753,
    defense: 2061,
    hp: 5604,
    crit: 821,
    magic: 3253,
    triggerOn: 'ally',
    triggerType: 'heal',
    triggerChance: 0.30,
    trigger(react, hero, actor) {
        react('hit', actor, 0.80);
    }
}, {
    name: 'Kane',
    className: 'Grand Ranger',
    attack: 3268,
    defense: 2142,
    hp: 6827,
    crit: 3104,
    magic: 998,
    triggerOn: 'self',
    triggerType: 'crit',
    triggerChance: 0.95,
    trigger(react, hero) {
        hero.allies.forEach(ally => {
            react('hit', ally, 0.80);
            react('stun', ally);
        });
    }
}, {
    name: 'Lancelot',
    className: 'Berserker',
    attack: 4121,
    defense: 1745,
    hp: 7649,
    crit: 1943,
    magic: 737,
    triggerOn: 'self',
    triggerType: 'crit',
    triggerChance: 0.95,
    trigger(react, hero) {
        hero.allies.forEach(ally => {
            react('hit', ally, 0.80);
            react('stun', ally);
        });
    }
}, {
    name: 'Leon',
    className: 'Blood Knight',
    attack: 3903,
    defense: 2955,
    hp: 8184,
    crit: 701,
    magic: 1307,
    triggerOn: 'self/ally',
    triggerType: 'hit',
    triggerChance: 1,
    trigger(react, hero, actor, damage) {
        react('heal', actor, damage * 0.25);
    }
}, {
    name: 'Matilda',
    className: 'Spirit Walker',
    attack: 2780,
    defense: 2081,
    hp: 5659,
    crit: 829,
    magic: 3284,
    triggerOn: 'ally',
    triggerType: 'heal',
    triggerChance: 0.40,
    trigger(react, hero) {
        react('hit', hero, 1.20);
    }
}, {
    name: 'Matilda',
    className: 'Witch Doctor',
    attack: 1967,
    defense: 2195,
    hp: 6195,
    crit: 504,
    magic: 3772,
    triggerOn: 'ally',
    triggerType: 'heal',
    triggerChance: 0.25,
    trigger(react, hero, actor) {
        react('reset', actor);
    }
}, {
    name: 'Omega Gryphon Lord',
    className: 'Beast',
    attack: 3252,
    defense: 3609,
    hp: 8122,
    crit: 770,
    magic: 1165,
    triggerOn: 'self/ally',
    triggerType: 'hit',
    triggerChance: 1,
    trigger(react, hero, actor, damage) {
        react('heal', actor, damage * 0.20);
    }
}, {
    name: 'Rhea',
    className: 'Gladiator',
    attack: 4463,
    defense: 2681,
    hp: 7649,
    crit: 665,
    magic: 737,
    triggerOn: 'ally',
    triggerType: 'hit',
    triggerChance: 0.50,
    trigger(react, hero) {
        react('reset', hero);
    }
}, {
    name: 'Shizu',
    className: 'Assassin',
    attack: 3940,
    defense: 2339,
    hp: 7286,
    crit: 3776,
    magic: 1128,
    triggerOn: 'self',
    triggerType: 'crit',
    triggerChance: 0.45,
    trigger(react, hero) {
        hero.allies.forEach(ally => {
            react('reset', ally);
        });
    }
}, {
    name: 'Shizu',
    className: 'Magebane',
    attack: 3653,
    defense: 2339,
    hp: 7286,
    crit: 3201,
    magic: 1990,
    triggerOn: 'hero',
    triggerType: 'hit',
    triggerChance: 0.35,
    trigger(react, hero) {
        hero.allies.forEach(ally => {
            react('hit', ally, 0.85);
            react('stun', ally);
        });
    }
}, {
    name: 'Shizu',
    className: 'Ninja',
    attack: 3509,
    defense: 3058,
    hp: 8004,
    crit: 3058,
    magic: 841,
    triggerOn: 'hero',
    triggerType: 'defeat',
    triggerChance: 0.50,
    trigger(react, hero) {
        react('reset', hero);
        hero.allies.forEach(ally => {
            react('reset', ally);
        });
    }
}, {
    name: 'Shizu',
    className: 'Samurai',
    attack: 3509,
    defense: 3058,
    hp: 8004,
    crit: 3058,
    magic: 841,
    triggerOn: 'ally',
    triggerType: 'hit',
    triggerChance: 0.35,
    trigger(react, hero, actor) {
        react('hit', actor);
    }
}, {
    name: 'Snow White',
    className: 'Archbishop',
    attack: 2101,
    defense: 2561,
    hp: 6600,
    crit: 509,
    magic: 3004,
    triggerOn: 'ally',
    triggerType: 'hit',
    triggerChance: 0.60,
    trigger(react, hero, actor) {
        react('hit', actor, 0.50);
        react('hex', actor, 1);
    }
}, {
    name: 'Valerie',
    className: 'Spirit Walker',
    attack: 2171,
    defense: 1956,
    hp: 5769,
    crit: 679,
    magic: 4343,
    triggerOn: 'turn',
    triggerType: 'turn',
    triggerChance: 1,
    trigger(react, hero) {
        react('heal', hero);
        hero.allies.forEach(ally => {
            react('heal', ally);
        });
    }
}, {
    name: 'Vivi',
    className: 'Machine',
    attack: 3216,
    defense: 2420,
    hp: 5653,
    crit: 2486,
    magic: 1143,
    triggerOn: 'self',
    triggerType: 'crit',
    triggerChance: 0.95,
    trigger(react, hero) {
        hero.allies.forEach(ally => {
            react('hit', ally, 0.80);
        });
    }
}];

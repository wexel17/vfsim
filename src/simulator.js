const ALLIES = {
    'front_left'  : [ 'mid_left', 'front_center'                             ],
    'front_center': [ 'front_left', 'mid_center', 'front_right'              ],
    'front_right' : [ 'front_center', 'mid_right'                            ],
    'mid_left'    : [ 'front_left', 'back_left', 'mid_center'                ],
    'mid_center'  : [ 'mid_left', 'front_center', 'back_center', 'mid_right' ],
    'mid_right'   : [ 'mid_center', 'front_right', 'back_right'              ],
    'back_left'   : [ 'mid_left', 'back_center'                              ],
    'back_center' : [ 'back_left', 'mid_center', 'back_right'                ],
    'back_right'  : [ 'back_center', 'mid_right'                             ],
};

const POSITION_LIST = Object.keys(ALLIES);

function allies(heroes, hero) {
    const position = POSITION_LIST.find(position => heroes[position] === hero);
    return ALLIES[position]
        .map(allyPosition => heroes[allyPosition])
        .filter(ally => !!ally);
}

function checkTrigger(chance, chainCount) {
    return chance * Math.max(0, 1 - chainCount * 0.05) > Math.random();
}

class Simulator {

    constructor(heroes, defense) {
        this.processAction = this.processAction.bind(this);
        this.heroes = Object.values(heroes).filter(hero => !!hero);
        this.heroes.forEach(hero => {
            hero.allies = allies(heroes, hero);
        });
        this.defense = defense;
    }

    processAction(type, hero, modifier = 1) {
        switch (type) {
            case 'hit':
                ++this.hits;
                ++hero.hits;
                ++this.chainCount;
                let damage;
                const critRate = Math.min(hero.crit / 9100, 0.75);
                if (critRate > Math.random()) {
                    damage = Math.max(1, hero.attack * modifier * 1.5 - this.defense);
                    this.damage += damage;
                    this.fireTrigger('hit', hero, damage);
                    this.fireTrigger('crit', hero);
                } else {
                    damage = Math.max(1, hero.attack * modifier - this.defense);
                    this.fireTrigger('hit', hero, damage);
                    this.damage += damage;
                }
                if (hero.rune === 'vampire') {
                    this.fireTrigger('heal', hero, damage * 0.25);
                }
                if (hero.rune === 'double' && 0.20 > Math.random()) {
                    // TODO is this really how it works?
                    ++this.hits;
                    ++hero.hits;
                    this.chainCount = 0;
                    if (critRate > Math.random()) {
                        this.damage += Math.max(1, hero.attack * 1.5 - this.defense);
                    } else {
                        this.damage += Math.max(1, hero.attack - this.defense);
                    }
                }
                break;
            case 'heal':
                this.fireTrigger('heal', hero, modifier);
                break;
            case 'reset':
                hero.ready = true;
                break;
            case 'exhaust':
                hero.ready = false;
                this.chainCount = 0;
                break;
            case 'start_turn':
                this.chainCount = 0;
                this.hits = 0;
                this.damage = 0;
                this.heroes.forEach(hero => {
                    hero.ready = true;
                    hero.hits = 0;
                    if (hero.triggerType === 'turn' && hero.triggerChance > Math.random()) {
                        hero.trigger(this.processAction, hero);
                    }
                });
                break;
            case 'hex':
            case 'stun':
            case 'knockback':
                // TODO not implemented
                break;
            default:
                console.error('unknown action:', type);
        }
    }

    fireTrigger(type, actor, damage) {
        if (actor.triggerType === type
                && (actor.triggerOn === 'self' || actor.triggerOn === 'self/ally')
                && checkTrigger(actor.triggerChance, this.chainCount)) {
            actor.trigger(this.processAction, actor, actor, damage);
        }
        for (let i = 0; i < actor.allies.length; ++i) {
            const ally = actor.allies[i];
            if (ally.triggerType === type
                    && (ally.triggerOn === 'ally' || ally.triggerOn === 'self/ally')
                    && checkTrigger(ally.triggerChance, this.chainCount)) {
                ally.trigger(this.processAction, ally, actor, damage);
            }
        }
    }
}

export default Simulator;
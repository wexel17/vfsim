# Valiant Force Team Simulator

This is a simulator to estimate the number of hits and rough damage per turn of a hero team for the game Valiant Force.

It makes a lot of simplifying assumptions including:

- the target is a single boss with infinite HP
- all heroes can hit the boss regardless of their position
- there is no chain or splash damage
- persistent aura buffs are not implemented
- auras are considered to go in all four directions
- active skills are not implemented
- skill runes are implemented but not yet configurable

Simply run the app with `yarn start` and configure squares in the grid to start simulating. The simulation is restarted automatically whenever a setting is changed.


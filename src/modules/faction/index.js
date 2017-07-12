import {
  connectionArgs,
  connectionFromArray,
  globalIdResolver,
} from 'graphql-relay-tools';

import relay from '../relay';
import ship from '../ship';

import { getEmpire, getRebels, getShip } from '../../data';

const schema = `
  type Faction implements Node {
    id: ID!
    name: String
    ships${connectionArgs()}: ShipConnection
  }
`;

const resolvers = {
  queries: {
    empire: getEmpire,
    rebels: getRebels,
  },
  Faction: {
    id: globalIdResolver(),
    ships: (faction, args) => connectionFromArray(
      faction.ships.map(getShip), args)
  },
};

export default () => ({
  schema: [
    schema,
  ],
  queries: `
    rebels: Faction
    empire: Faction
  `,
  resolvers,
  modules: [relay, ship],
});
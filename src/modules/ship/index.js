import {
  globalIdResolver,
  connectionDefinitions,
  mutationWithClientMutationId,
} from 'graphql-relay-tools';

import relay from '../relay';
import schema from './shema.graphql';

import { createShip, getFaction, getShip } from '../../data';

const { connectionType } = connectionDefinitions({
  name: 'Ship'
});

const {
  mutationField,
  mutationType,
  mutationResolver,
} = mutationWithClientMutationId({
  name: 'IntroduceShip',
  inputFields: `
    shipName: String!
    factionId: ID!
  `,
  outputFields: `
    ship: Ship
    faction: Faction
  `,
  mutateAndGetPayload: (input) => {
    const { shipName, factionId } = input;
    const newShip = createShip(shipName, factionId);
    return {
      ship: getShip(newShip.id),
      faction: getFaction(factionId)
    };
  }
});

const resolvers = {
  mutations: {
    introduceShip: mutationResolver
  },
  Ship: {
    id: globalIdResolver(),
  },
};

export default () => ({
  schema: [
    schema,
    connectionType,
    mutationType,
  ],
  mutations: `
    introduceShip${mutationField}
  `,
  resolvers,
  modules: [relay],
});
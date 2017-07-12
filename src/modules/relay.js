import {
  nodeDefinitions,
  nodeInterface,
  nodeField,
  nodesField,
  fromGlobalId,
  pageInfoType,
} from 'graphql-relay-tools';

import { getFaction, getShip } from '../data';

const { nodeResolver, nodesResolver } = nodeDefinitions((globalId) => {
  const { type, id } = fromGlobalId(globalId);
  if (type === 'Faction') {
    return getFaction(id);
  }
  if (type === 'Ship') {
    return getShip(id);
  }
  return null;
});

const resolvers = {
  queries: {
    node: nodeResolver,
    nodes: nodesResolver,
  },
  Node: {
    __resolveType: obj => (obj.ships ? 'Faction' : 'Ship')
  },
};

export default () => ({
  schema: [nodeInterface, pageInfoType],
  queries: `
    ${nodeField}
    ${nodesField}
  `,
  resolvers,
});
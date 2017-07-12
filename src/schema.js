import { makeExecutableSchema } from 'graphql-tools';
import { bundle } from 'graphql-modules';

import modules from './modules';

export default makeExecutableSchema(bundle(modules));

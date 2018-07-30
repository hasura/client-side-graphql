import React from 'react';
import { ApolloProvider } from 'react-apollo';
import AppRouter from './AppRouter';
import ApolloClient from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  makeExecutableSchema,
  makeRemoteExecutableSchema,
  introspectSchema,
  mergeSchemas
} from 'graphql-tools';
import weatherTypeDefs from './graphql/typeDefs';
import weatherResolvers from './graphql/resolvers';
import personWeatherTypeExtensions from './graphql/linkTypeDefs';
import schemaStitchingResolvers from './graphql/schemaStitchingResolvers';

const personGraphQLUri = 'https://bazookaand.herokuapp.com/v1alpha1/graphql';

const initApollo = async () => {
  const link = new HttpLink({uri: personGraphQLUri});
  const personSchema = await introspectSchema(link);
  const executablePersonSchema = makeRemoteExecutableSchema({
    schema: personSchema,
    link
  });
  const executableWeatherSchema = makeExecutableSchema({
    typeDefs: weatherTypeDefs,
    resolvers: weatherResolvers
  });

  const newSchema = mergeSchemas({
    schemas: [
      executableWeatherSchema,
      executablePersonSchema,
      personWeatherTypeExtensions
    ],
    resolvers: schemaStitchingResolvers({
      weather: executableWeatherSchema,
      person: executablePersonSchema
    })
  });

  const client = new ApolloClient({
    link: new SchemaLink({ schema: newSchema }),
    cache: new InMemoryCache({
      addTypename: false
    }),
    connectToDevTools: true
  });

  return client;
};

class App extends React.Component {
  state = {
    client: null,
  }

  async componentWillMount() {
    const client = await initApollo();
    this.setState({ client });
  }

  render() {
    if (!this.state.client) {
      return "Loading ...";
    }
    return (
      <ApolloProvider client={this.state.client}>
        <AppRouter />
      </ApolloProvider>
    );
  }
}

export default App;

import React from 'react';
import { render } from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost/wordpress/graphql',
  cache: new InMemoryCache()
});

const GetOrders = gql`
  query orders {
    nodes {
      orderNumber
      date
      status
      total
      customer {
        firstName
        lastName
      }
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(GetOrders);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error' ${error.message}'</p>;
  console.log(data);

  // return data.orders.nodes.map(({ orderNumber}) => (
  //   <div key={orderNumber}>
  //     <p>
  //       {orderNumber}
  //     </p>
  //   </div>
  // ));
}

render(
  <ApolloProvider client={client}>
    <ExchangeRates />
  </ApolloProvider>,
  document.getElementById('root'),
);

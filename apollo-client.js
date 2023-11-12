import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';


const link = createHttpLink({
    uri: 'http://localhost:3001/graphql',
    //uri: 'http://crux-dire-staging-elb-2035361662.us-west-1.elb.amazonaws.com/graphql',
});
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('auth_token');
    // return the headers to the context so httpLink can read them

    const h=  {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }

    return {
      headers: h
    }
  });
  

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(link)
    // link: from([link, errorLink]),
});

export default client;
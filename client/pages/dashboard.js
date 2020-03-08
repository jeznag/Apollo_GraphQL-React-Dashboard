import DashboardView from '../src/pages/Dashboard/DashboardView';
import React, {useEffect} from 'react';
import Router from 'next/router'
import Cookiez from 'next-cookies';
import fetch from 'node-fetch';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';

const link = createHttpLink({ uri: '/graphql', fetch: fetch });

export default function DashboardPage(props) {
  // TODO if not logged in redirect to login
  useEffect(() => {
    if(!props.token){
      Router.push('/')
    }
  });

  const client = new ApolloClient({
    uri:
      'https://jt63wdhqqre6rpjo5lnylfhjqm.appsync-api.ap-southeast-2.amazonaws.com/graphql',
    headers: {
      Authorization: props.token,
      UserID: props.userId,
      'X-API-KEY': 'da2-d5trhzrnqraznclr2teue2bmmu',
    },
    fetch,
  });

  return (
    <ApolloProvider client={client}>
      <DashboardView />
    </ApolloProvider>
  );
}

DashboardPage.getInitialProps = ctx => {
  const token = Cookiez(ctx).GofarDashboardToken;
  const userId = Cookiez(ctx).GofarDashboardUserId;
  return {
    cookiez: Cookiez(ctx) || '',
    token,
    userId,
  };
};

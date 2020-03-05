import React from 'react';
import fetch from 'node-fetch';
import Cookiez from 'next-cookies';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import LoginView from '../src/pages/Login/LoginView';
import { useRouter } from 'next/router';

function handleSuccessfulLogin(router) {
  return function(loginResult) {
    document.cookie = `GofarDashboardUserId=${loginResult.userId};`
    document.cookie = `GofarDashboardToken=${loginResult.authToken};`
    router.push('/dashboard');
  };
}

export default function LoginPage(props) {

  const router = useRouter();

  const client = new ApolloClient({
    uri:
      'https://jt63wdhqqre6rpjo5lnylfhjqm.appsync-api.ap-southeast-2.amazonaws.com/graphql',
    headers: {
      Authorization: props.authToken,
      'X-API-KEY': 'da2-d5trhzrnqraznclr2teue2bmmu',
    },
    fetch,
  });
  return (
    <ApolloProvider client={client}>
      <LoginView
        {...props}
        handleSuccessfulLogin={handleSuccessfulLogin(router)}
      />
      
    </ApolloProvider>
  );
}

LoginPage.getInitialProps = ctx => {
  return {
    cookiez: Cookiez(ctx) || '',
  };
};

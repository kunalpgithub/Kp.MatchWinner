import { Config } from '@abp/ng.core';

const baseUrl = 'https://crictics.azurewebsites.net';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'MatchWinner',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://matchwinner.azurewebsites.net',
    redirectUri: baseUrl,
    clientId: 'MatchWinner_App',
    responseType: 'code',
    scope: 'offline_access MatchWinner',
  },
  apis: {
    default: {
      url: 'https://matchwinner.azurewebsites.net',
      rootNamespace: 'Kp.MatchWinner',
    },
  },
} as Config.Environment;

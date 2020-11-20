import { Config } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'MatchWinner',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44312',
    redirectUri: baseUrl,
    clientId: 'MatchWinner_App',
    responseType: 'code',
    scope: 'offline_access MatchWinner',
  },
  apis: {
    default: {
      url: 'https://localhost:44312',
      rootNamespace: 'Kp.MatchWinner',
    },
  },
} as Config.Environment;

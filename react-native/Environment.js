const ENV = {
  dev: {
    apiUrl: 'http://localhost:44312',
    oAuthConfig: {
      issuer: 'http://localhost:44312',
      clientId: 'MatchWinner_App',
      clientSecret: '1q2w3e*',
      scope: 'MatchWinner',
    },
    localization: {
      defaultResourceName: 'MatchWinner',
    },
  },
  prod: {
    apiUrl: 'http://localhost:44312',
    oAuthConfig: {
      issuer: 'http://localhost:44312',
      clientId: 'MatchWinner_App',
      clientSecret: '1q2w3e*',
      scope: 'MatchWinner',
    },
    localization: {
      defaultResourceName: 'MatchWinner',
    },
  },
};

export const getEnvVars = () => {
  // eslint-disable-next-line no-undef
  return __DEV__ ? ENV.dev : ENV.prod;
};

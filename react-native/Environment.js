const ENV = {
  dev: {
    apiUrl: 'http://192.168.29.240:44312',
    // apiUrl: 'http://192.168.244.165/:44312',
    oAuthConfig: {
      issuer: 'http://192.168.29.240:44312',
      // issuer: 'http://192.168.244.165:44312',
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

import api from './API';

export const getRunningTournament = () =>
  api({
    method: 'GET',
    url: `/api/app/tournamentMatch/runningTournament`,
  }).then(({ data }) => data);

export const getMatches = (tournamentId, season) =>
  api({
    method: 'GET',
    url: `/api/app/tournamentMatch/matches/${tournamentId}`,
    params: { season: season },
  }).then(({ data }) => data);

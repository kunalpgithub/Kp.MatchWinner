import { AxiosResponse } from 'axios';
import { CurrentTournamentDto, MatchAnalysisReport, TournamentMatchDto } from '../models/match';
import api from './API';

export const getRunningTournament = (): Promise<CurrentTournamentDto[]> =>
  api({
    method: 'GET',
    url: `/api/app/tournamentMatch/runningTournament`,
  }).then((response: AxiosResponse<CurrentTournamentDto[]>) => response.data);

export const getMatches = (tournamentId, season): Promise<TournamentMatchDto[]> =>
  api({
    method: 'GET',
    url: `/api/app/tournamentMatch/matches/${tournamentId}`,
    params: { season: season },
  }).then((response: AxiosResponse<TournamentMatchDto[]>) => response.data);


export const getMatchAnalysis = (homeTeam: string, visitorTeam: string, venue: string) =>
  api({
    method: 'GET',
    url: `/api/app/matchAnalysis/matchAnalysis`,
    params: { homeTeam: homeTeam, visitorTeam: visitorTeam, venue: venue },
  }).then((response: AxiosResponse<MatchAnalysisReport>) => response.data);

export const getTournamnetByAvailabilityByIsAvailable = (isAvailable: boolean = true) =>
  api({
    method: 'GET',
    url: `/api/app/tournament/gettournamnetbyavailability`,
    params: { isAvailable: isAvailable },
  }).then((response: AxiosResponse<MatchAnalysisReport>) => response.data);





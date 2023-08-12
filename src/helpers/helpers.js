import axios from 'axios';

export const getPlayerStats = async (players) => {
  const promises = [];

  const getData = async (x) => {
    const res = axios.get(
      `https://statsapi.web.nhl.com/api/v1/people/${x}/stats?stats=yearByYear`
    );
    return res;
  };

  players.forEach((element) => {
    promises.push(getData(element.id));
  });

  await Promise.all(promises).then((results) => {
    // console.log('done', results);
    return results;
  });
};

export const searchPlayerID = async (player) => {
  const promises = [];

  const getData = () => {
    const res = axios.get(
      `https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster`
    );
    return res;
  };

  promises.push(getData());

  await Promise.all(promises).then((results) => {
    const teams = results[0].data.teams;

    teams.forEach((team) => {
      const roster = team.roster.roster;
      roster.forEach((rosterPlayer) => {
        if (rosterPlayer.person.fullName === player) {
          return rosterPlayer;
        }
      });
    });
  });
};
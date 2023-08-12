import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
  marginBottom: {
    marginBottom: '100px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  formControl: {
    minWidth: 180,
    marginLeft: '24px',
  },
});

// to get player ID -> GET https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster

function PlayerPickupComponent() {
  const classes = useStyles();
  const [players] = useState([
    { name: 'Alex Ovechkin', id: '8471214' },
    { name: 'Mika Zibanejad', id: '8476459' },
    { name: 'Jonathan Huberdeau', id: '8476456' },
    { name: 'Jake Guentzel', id: '8477404' },
    { name: 'Ryan Nugent-Hopkins', id: '8476454' },
    { name: 'J.T. Miller', id: '8476468' },
    { name: 'Filip Forsberg', id: '8476887' },
    { name: 'Brady Tkachuk', id: '8480801' },
    { name: 'Max Domi', id: '8477503' },
    { name: 'Chris Kreider', id: '8475184' },
  ]);
  const [defensePlayers] = useState([
    { name: 'Brent Burns', id: '8470613' },
    { name: 'Ryan Pulock', id: '8477506' },
    { name: 'Mark Giordano', id: '8470966' },
    { name: 'Quinn Hughes', id: '8480800' },
    { name: 'Adam Fox', id: '8479323' },
    { name: 'Rasmus Ristolainen', id: '8477499' },
  ]);
  const [rows, setRows] = useState([]);
  const [defenseRows, setDefenseRows] = useState([]);
  const [games, setGames] = useState(1);

  function createData(name, games, goals, assists, plusMinus, points) {
    return { name, games, goals, assists, plusMinus, points };
  }

  useEffect(() => {
    if (games === 1) {
      getPlayerStats();
      getDefensePlayerStats();
    } else if (games === 4) {
      getSelectedPlayerStats(4);
      getSelectedDefensePlayerStats(4);
    } else if (games === 5) {
      getSelectedPlayerStats(5);
      getSelectedDefensePlayerStats(5);
    }
    // eslint-disable-next-line
  }, [games]);

  const getSelectedPlayerStats = async (games) => {
    setRows([]);
    const promises = [];

    const getData = async (x) => {
      const res = axios.get(
        `https://statsapi.web.nhl.com/api/v1/people/${x}/stats?stats=gameLog`
      );
      return res;
    };

    players.forEach((element) => {
      promises.push(getData(element.id));
    });

    await Promise.all(promises).then((results) => {
      results.map((item, i) => {
        const stats = {
          games: games,
          goals: 0,
          assists: 0,
          plusMinus: 0,
          points: 0,
        };

        let selectedGames = item.data.stats[0].splits.splice(0, games);
        selectedGames.forEach((game) => {
          stats.goals += game.stat.goals;
          stats.assists += game.stat.assists;
          stats.plusMinus += game.stat.plusMinus;
          stats.points += game.stat.points;
        });

        setRows((rows) => [
          ...rows,
          {
            name: players[i].name,
            games: stats.games,
            goals: stats.goals,
            assists: stats.assists,
            plusMinus: stats.plusMinus,
            points: stats.points,
          },
        ]);
        return null;
      });
    });
  };

  const getSelectedDefensePlayerStats = async (games) => {
    setDefenseRows([]);
    const promises = [];

    const getData = async (x) => {
      const res = axios.get(
        `https://statsapi.web.nhl.com/api/v1/people/${x}/stats?stats=gameLog`
      );
      return res;
    };

    defensePlayers.forEach((element) => {
      promises.push(getData(element.id));
    });

    await Promise.all(promises).then((results) => {
      results.map((item, i) => {
        const stats = {
          games: games,
          goals: 0,
          assists: 0,
          plusMinus: 0,
          points: 0,
        };

        let selectedGames = item.data.stats[0].splits.splice(0, games);
        selectedGames.forEach((game) => {
          stats.goals += game.stat.goals;
          stats.assists += game.stat.assists;
          stats.plusMinus += game.stat.plusMinus;
          stats.points += game.stat.points;
        });

        setDefenseRows((rows) => [
          ...rows,
          {
            name: defensePlayers[i].name,
            games: stats.games,
            goals: stats.goals,
            assists: stats.assists,
            plusMinus: stats.plusMinus,
            points: stats.points,
          },
        ]);
        return null;
      });
    });
  };

  const getPlayerStats = async () => {
    setRows([]);
    const promises = [];

    const getData = async (x) => {
      const res = axios.get(
        `https://statsapi.web.nhl.com/api/v1/people/${x}/stats?stats=statsSingleSeason&season=20222023`
      );
      return res;
    };

    players.forEach((element) => {
      promises.push(getData(element.id));
    });

    await Promise.all(promises).then((results) => {
      results.map((item, i) => {
        setRows((rows) => [
          ...rows,
          createData(
            players[i].name,
            item.data.stats[0].splits[0].stat.games,
            item.data.stats[0].splits[0].stat.goals,
            item.data.stats[0].splits[0].stat.assists,
            item.data.stats[0].splits[0].stat.plusMinus,
            item.data.stats[0].splits[0].stat.points
          ),
        ]);
        return null;
      });
    });
  };

  const getDefensePlayerStats = async () => {
    setDefenseRows([]);
    const promises = [];

    const getData = async (x) => {
      const res = axios.get(
        `https://statsapi.web.nhl.com/api/v1/people/${x}/stats?stats=statsSingleSeason&season=20222023`
      );
      return res;
    };

    defensePlayers.forEach((element) => {
      promises.push(getData(element.id));
    });

    await Promise.all(promises).then((results) => {
      results.map((item, i) => {
        setDefenseRows((rows) => [
          ...rows,
          createData(
            defensePlayers[i].name,
            item.data.stats[0].splits[0].stat.games,
            item.data.stats[0].splits[0].stat.goals,
            item.data.stats[0].splits[0].stat.assists,
            item.data.stats[0].splits[0].stat.plusMinus,
            item.data.stats[0].splits[0].stat.points
          ),
        ]);
        return null;
      });
    });
  };

  const handleChange = (event) => {
    let value = event.target.value;
    setGames(value);
  };

  return (
    <Container>
      <div className={classes.header}>
        <h1>player stats</h1>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Games Selected</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={games}
            onChange={handleChange}
          >
            <MenuItem value={1}>All</MenuItem>
            <MenuItem value={4}>Past Four</MenuItem>
            <MenuItem value={5}>Past Five</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className={classes.marginBottom}>
        <h2>Offense Players</h2>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Games Played</TableCell>
                <TableCell align="left">Goals</TableCell>
                <TableCell align="left">Assists</TableCell>
                <TableCell align="left">Plus Minus</TableCell>

                <TableCell align="left">Points</TableCell>
                <TableCell align="left">Fantasy Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .sort(function (a, b) {
                  return (
                    b.goals * 2 +
                    b.assists +
                    b.plusMinus * 0.5 -
                    (a.goals * 2 + a.assists + a.plusMinus * 0.5)
                  );
                })
                .map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="center">{row.games}</TableCell>
                    <TableCell align="center">{row.goals}</TableCell>
                    <TableCell align="center">{row.assists}</TableCell>
                    <TableCell align="center">{row.plusMinus}</TableCell>
                    <TableCell align="center">{row.points}</TableCell>
                    <TableCell align="center">
                      {row.goals * 2 + row.assists + row.plusMinus * 0.5}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <h2>Defense Players</h2>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Games Played</TableCell>
                <TableCell align="left">Goals</TableCell>
                <TableCell align="left">Assists</TableCell>
                <TableCell align="left">Plus Minus</TableCell>

                <TableCell align="left">Points</TableCell>
                <TableCell align="left">Fantasy Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {defenseRows
                .sort(function (a, b) {
                  return (
                    b.goals * 2 +
                    b.assists +
                    b.plusMinus * 0.5 -
                    (a.goals * 2 + a.assists + a.plusMinus * 0.5)
                  );
                })
                .map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="center">{row.games}</TableCell>
                    <TableCell align="center">{row.goals}</TableCell>
                    <TableCell align="center">{row.assists}</TableCell>
                    <TableCell align="center">{row.plusMinus}</TableCell>
                    <TableCell align="center">{row.points}</TableCell>
                    <TableCell align="center">
                      {row.goals * 2 + row.assists + row.plusMinus * 0.5}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}

export default PlayerPickupComponent;
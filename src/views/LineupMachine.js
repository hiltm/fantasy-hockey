import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setCurrentWeek } from '../store/AllData/allData.actions';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import ScheduleGridComponent from '../components/lineupMachineTable.js';
import axios from 'axios';
import moment from 'moment';

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentWeek: (x) => dispatch(setCurrentWeek(x)),
  };
};
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;
function LineupMachineComponent(props) {
  const [currentWeek, setCurrentWeek] = useState(3);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const handleChange = (event) => {
    //sets week in page
    setCurrentWeek(event.target.value);
    //sets week in store
    props.setCurrentWeek(event.target.value);
  };
  const getWeeks = () => {
    let content = [];
    for (let i = 1; i < 25; i++) {
      content.push(
        <MenuItem key={i} value={i}>
          Week {i}
        </MenuItem>
      );
    }
    return content;
  };

  const teams = [
    { name: 'Anaheim Ducks', abbr: 'ANA' },
    { name: 'Arizona Coyotes', abbr: 'ARI' },
    { name: 'Boston Bruins', abbr: 'BOS' },
    { name: 'Buffalo Sabres', abbr: 'BUF' },
    { name: 'Calgary Flames', abbr: 'CGY' },
    { name: 'Carolina Hurricanes', abbr: 'CAR' },
    { name: 'Chicago Blackhawks', abbr: 'CHI' },
    { name: 'Colorado Avalanche', abbr: 'COL' },
    { name: 'Columbus Blue Jackets', abbr: 'CBJ' },
    { name: 'Dallas Stars', abbr: 'DAL' },
    { name: 'Detroit Red Wings', abbr: 'DET' },
    { name: 'Edmonton Oilers', abbr: 'EDM' },
    { name: 'Florida Panthers', abbr: 'FLA' },
    { name: 'Los Angeles Kings', abbr: 'LAK' },
    { name: 'Minnesota Wild', abbr: 'MIN' },
    { name: 'Montréal Canadiens', abbr: 'MTL' },
    { name: 'Nashville Predators', abbr: 'NSH' },
    { name: 'New Jersey Devils', abbr: 'NJD' },
    { name: 'New York Islanders', abbr: 'NYI' },
    { name: 'New York Rangers', abbr: 'NYI' },
    { name: 'Ottawa Senators', abbr: 'OTT' },
    { name: 'Philadelphia Flyers', abbr: 'PHI' },
    { name: 'Pittsburgh Penguins', abbr: 'PIT' },
    { name: 'San Jose Sharks', abbr: 'SJS' },
    { name: 'Seattle Kraken', abbr: 'SEA' },
    { name: 'St. Louis Blues', abbr: 'STL' },
    { name: 'Tampa Bay Lightning', abbr: 'TBL' },
    { name: 'Toronto Maple Leafs', abbr: 'TOR' },
    { name: 'Vancouver Canucks', abbr: 'VAN' },
    { name: 'Vegas Golden Knights', abbr: 'VGK' },
    { name: 'Washington Capitals', abbr: 'WSH' },
    { name: 'Winnipeg Jets', abbr: 'WPG' },
  ];

  // TODO: Generate week list with moment or something. Given a starting date, and number of weeks
  const [fantasyWeekList] = useState([
    {
      id: 1,
      name: 'Week 1',
      startDate: '10/17/21',
      endDate: '10/23/21',
    },
    {
      id: 2,
      name: 'Week 2',
      startDate: '10/24/21',
      endDate: '10/30/21',
    },
    {
      id: 3,
      name: 'Week 3',
      startDate: '10/31/21',
      endDate: '11/6/21',
    },
    {
      id: 4,
      name: 'Week 4',
      startDate: '11/7/21',
      endDate: '11/13/21',
    },
    {
      id: 5,
      name: 'Week 5',
      startDate: '11/14/21',
      endDate: '11/20/21',
    },
    {
      id: 6,
      name: 'Week 6',
      startDate: '11/21/21',
      endDate: '11/27/21',
    },
    {
      id: 7,
      name: 'Week 7',
      startDate: '11/28/21',
      endDate: '12/4/21',
    },
    {
      id: 8,
      name: 'Week 8',
      startDate: '12/5/21',
      endDate: '12/11/21',
    },
    {
      id: 9,
      name: 'Week 9',
      startDate: '12/12/21',
      endDate: '12/18/21',
    },
    {
      id: 10,
      name: 'Week 10',
      startDate: '12/19/12',
      endDate: '12/23/21',
    },
    {
      id: 11,
      name: 'Week 11',
      startDate: '12/27/21',
      endDate: '1/1/22',
    },
    {
      id: 12,
      name: 'Week 12',
      startDate: '1/2/22',
      endDate: '1/8/22',
    },
    {
      id: 13,
      name: 'Week 13',
      startDate: '1/9/22',
      endDate: '1/15/22',
    },
    {
      id: 14,
      name: 'Week 14',
      startDate: '1/16/22',
      endDate: '1/22/22',
    },
    {
      id: 15,
      name: 'Week 15',
      startDate: '1/23/22',
      endDate: '1/29/22',
    },
    {
      id: 16,
      name: 'Week 16',
      startDate: '1/30/22',
      endDate: '2/26/22',
    },
    {
      id: 17,
      name: 'Week 17',
      startDate: '2/27/22',
      endDate: '3/5/22',
    },
    {
      id: 18,
      name: 'Week 18',
      startDate: '3/6/22',
      endDate: '3/12/22',
    },
    {
      id: 19,
      name: 'Week 19',
      startDate: '3/13/22',
      endDate: '3/19/22',
    },
    {
      id: 20,
      name: 'Week 20',
      startDate: '3/20/22',
      endDate: '3/26/22',
    },
    {
      id: 21,
      name: 'Week 21',
      startDate: '3/27/22',
      endDate: '4/2/22',
    },
    {
      id: 22,
      name: 'Week 22',
      startDate: '4/3/22',
      endDate: '4/9/22',
    },
    {
      id: 23,
      name: 'Week 23',
      startDate: '4/10/22',
      endDate: '4/16/22',
    },
    {
      id: 24,
      name: 'Week 24',
      startDate: '4/17/22',
      endDate: '4/18/22',
    },
  ]);

  const getDaysArray = (start, end) => {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  const generateFantasySchedule = (start, end, exceptions) => {
    const weeks = moment(end).diff(moment(start), 'week');
    const schedule = [];
    let weekStart;
    let daysBetween = 6;
    for (let i = 0; i <= weeks; i++) {
      if (i === 0) {
        weekStart = start;
      }
      if (exceptions.some((week) => week['Week'] === i)) {
        const exception = exceptions.find((x) => x.Week === i);
        weekStart = exception.start;
        daysBetween = moment(exception.end).diff(
          moment(exception.start),
          'days'
        );
      } else {
        daysBetween = 6;
      }
      let weekEnd = moment(weekStart)
        .add(daysBetween, 'days')
        .format('MM/DD/YY');
      schedule.push({
        id: i + 1,
        name: `Week ${i + 1}`,
        weekStart: weekStart,
        weekEnd: weekEnd,
      });
      weekStart = moment(weekEnd).add(1, 'days').format('MM/DD/YY');
    }
    console.log(schedule);
  };

  useEffect(() => {
    // create fantasy schedule given two dates
    const exceptions = [
      { Week: 10, start: '12/19/21', end: '12/23/21' },
      { Week: 11, start: '12/27/21', end: '1/1/22' },
    ];
    const startDate = '10/17/21';
    const endDate = '4/23/22';
    generateFantasySchedule(startDate, endDate, exceptions);
  }, []);

  useEffect(() => {
    const addPlayerSchedule = async (data) => {
      const promises = [];
      const startDate = moment(
        fantasyWeekList[currentWeek - 1].startDate
      ).format('YYYY-MM-DD');
      const endDate = moment(fantasyWeekList[currentWeek - 1].endDate).format(
        'YYYY-MM-DD'
      );

      const getData = async (x) => {
        const res = axios.get(
          `https://statsapi.web.nhl.com/api/v1/schedule?teamId=${x.teamID}&startDate=${startDate}&endDate=${endDate}`
        );
        return res;
      };

      data.forEach((d) => {
        promises.push(getData(d));
      });
      await Promise.all(promises).then((results) => {
        const updatedPlayerData = [...playerData];
        results.forEach((result, index) => {
          updatedPlayerData[index].gamesThisWeek = result.data.dates;
        });
        setPlayerData(updatedPlayerData);
      });
    };

    const addPlayerTeamAbbr = async (data) => {
      const promises = [];
      const getData = async (x) => {
        const res = axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${x}`);
        return res;
      };

      data.forEach((d) => {
        promises.push(getData(d.teamID));
      });
      await Promise.all(promises).then((results) => {
        const updatedPlayerData = [...playerData];
        results.forEach((result, index) => {
          updatedPlayerData[index].teamAbbr = result.data.teams[0].abbreviation;
        });
        addPlayerSchedule(updatedPlayerData);
      });
    };

    const addPlayerTeamID = async () => {
      const promises = [];
      const getData = async (x) => {
        const res = axios.get(
          `https://statsapi.web.nhl.com/api/v1/people/${x.id}`
        );
        return res;
      };
      playerData.forEach((player) => {
        promises.push(getData(player));
      });
      await Promise.all(promises).then((results) => {
        const updatedPlayerData = [...playerData];
        results.forEach((result, index) => {
          updatedPlayerData[index].teamID =
            result.data.people[0].currentTeam.id;
        });
        addPlayerTeamAbbr(updatedPlayerData);
      });
    };
    addPlayerTeamID();
  }, [currentWeek]);

  useEffect(() => {
    const createDaylist = () => {
      let weekObject = fantasyWeekList.find((x) => x.id === currentWeek);
      var daylist = getDaysArray(
        new Date(weekObject.startDate),
        new Date(weekObject.endDate)
      );
      daylist.map((v) => v.toISOString().slice(0, 10)).join('');
      createColumnData(daylist);
    };
    createDaylist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWeek]);
  const createColumnData = (daylist) => {
    // eslint-disable-next-line array-callback-return
    setColumns([
      {
        Header: 'Player',
        accessor: 'name',
      },
    ]);
    daylist.map((currentWeek, i) => {
      setColumns((columns) => [
        ...columns,
        {
          Header: currentWeek.toLocaleDateString('en-US'),
          accessor: `day${i + 1}`,
        },
      ]);
    });
  };

  const checkIfPlaying = (player, column) => {
    let formattedDate = moment(column.Header).format('YYYY-MM-DD');
    let gameData = player.gamesThisWeek.find(
      (game) => game['date'] === formattedDate
    );
    if (typeof gameData !== 'undefined') {
      const homeTeam = gameData.games[0].teams.home.team;
      const awayTeam = gameData.games[0].teams.away.team;
      if (player.teamID === homeTeam.id) {
        let team = teams.find((team) => team['name'] === awayTeam.name);
        return team.abbr;
      } else {
        let team = teams.find((team) => team['name'] === homeTeam.name);
        return `@${team.abbr}`;
      }
    } else {
      return '';
    }
  };

  const createRowData = () => {
    //for each column
    let array = [];
    playerData.map((player) => {
      //for each player
      let object = { name: player.name };
      columns.map((cl) => {
        if (cl.Header !== 'Player') {
          let check = checkIfPlaying(player, cl);
          object = { ...object, [cl.accessor]: check };
        }
      });
      array.push(object);
    });
    setRows(array);
  };

  const [playerData, setPlayerData] = useState([
    {
      name: 'Alex Ovechkin',
      id: '8471214',
      teamID: '',
      teamAbbr: '',
      gamesThisWeek: [],
      pos: 'F',
    },
    {
      name: 'Mika Zibanejad',
      id: '8476459',
      teamID: '',
      teamAbbr: '',
      gamesThisWeek: [],
      pos: 'F',
    },
    {
      name: 'Jonathan Huberdeau',
      id: '8476456',
      teamID: '',
      teamAbbr: '',
      gamesThisWeek: [],
      pos: 'F',
    },
    {
      name: 'Jake Guentzel',
      id: '8477404',
      teamID: '',
      teamAbbr: '',
      gamesThisWeek: [],
      pos: 'F',
    },
    {
      name: 'Ryan Nugent-Hopkins',
      id: '8476454',
      teamID: '',
      teamAbbr: '',
      gamesThisWeek: [],
      pos: 'F',
    },
    {
      name: 'J.T. Miller',
      id: '8476468',
      teamID: '',
      teamAbbr: '',
      gamesThisWeek: [],
      pos: 'F',
    },
    {
      name: 'Filip Forsberg',
      id: '8476887',
      teamID: '',
      teamAbbr: '',
      gamesThisWeek: [],
      pos: 'F',
    },
    {
      name: 'Brady Tkachuk',
      id: '8480801',
      teamID: '',
      teamAbbr: '',
      gamesThisWeek: [],
      pos: 'F',
    },
    {
      name: 'Max Domi',
      id: '8477503',
      teamID: '',
      teamAbbr: '',
      gamesThisWeek: [],
      pos: 'F',
    },
    {
      name: 'Chris Kreider',
      id: '8475184',
      teamID: '',
      teamAbbr: '',
      gamesThisWeek: [],
      pos: 'F',
    },
    {
      name: 'Brent Burns',
      id: '8470613',
      teamID: '',
      teamAbbr: '',
      gamesThisWeek: [],
      pos: 'D',
    },
    {
      name: 'Ryan Pulock',
      id: '8477506',
      teamID: '',
      teamAbbr: '',
      gamesThisWeek: [],
      pos: 'D',
    },
    {
      name: 'Mark Giordano',
      id: '8470966',
      teamID: '',
      teamAbbr: '',
      gamesThisWeek: [],
      pos: 'D',
    },
    {
      name: 'Quinn Hughes',
      id: '8480800',
      teamID: '',
      teamAbbr: '',
      gamesThisWeek: [],
      pos: 'D',
    },
    {
      name: 'Adam Fox',
      id: '8479323',
      teamID: '',
      teamAbbr: '',
      gamesThisWeek: [],
      pos: 'D',
    },
    {
      name: 'Rasmus Ristolainen',
      id: '8477499',
      teamID: '',
      teamAbbr: '',
      gamesThisWeek: [],
      pos: 'D',
    },
  ]);

  useEffect(() => {
    createRowData();
  }, [playerData]);

  const headers = useMemo(() => columns, [columns]);
  const data = useMemo(() => rows, [rows]);
  return (
    <Container maxWidth="xl">
      <h1>hi</h1>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Week</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentWeek}
            label="Week"
            onChange={handleChange}
          >
            {getWeeks()}
          </Select>
        </FormControl>
      </Box>
      <Styles>
        <ScheduleGridComponent columns={headers} data={data} />
      </Styles>
    </Container>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LineupMachineComponent);
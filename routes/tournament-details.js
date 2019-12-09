var express = require('express');
var router = express.Router();
var db = require('../db');

var fixtures = [
  { id: "1", team1: "T1", team2: "T2", status: "1", tournamentId: "1", result: "T1 won by 10 runs", venue: "Pune staion", time : '30-07-2019' },
  { id: "2", team1: "T2", team2: "T3", status: "1", tournamentId: "2", result: "T3 won by 10 runs", venue: "Hinjewadi", time : '30-07-2019' },
  { id: "3", team1: "T4", team2: "T5", status: "1", tournamentId: "1", result: "T41 won by 10 runs", venue: "Aundh", time : '30-07-2019' },
  { id: "4", team1: "T1", team2: "T2", status: "1", tournamentId: "1", result: "T2 won by 10 runs", venue: "Baner", time : '30-07-2019' },
  { id: "4", team1: "T3", team2: "T5", status: "1", tournamentId: "3", result: "T5 won by 10 runs", venue: "Hadapsar", time : '30-07-2019' },
  { id: "5", team1: "T2", team2: "T6", status: "0", tournamentId: "3", result: "Not yet started", venue: "Wakadewadi", time : '30-07-2019' },
  { id: "6", team1: "T7", team2: "T2", status: "0", tournamentId: "1", result: "Not yet started", venue: "Nigdi", time : '30-07-2019' },
  { id: "7", team1: "T2", team2: "T5", status: "0", tournamentId: "4", result: "Not yet started", venue: "Gokhlenagar", time : '30-07-2019' },
  { id: "8", team1: "T2", team2: "T1", status: "0", tournamentId: "4", result: "Not yet started", venue: "Katraj", time : '30-07-2019' },
  { id: "9", team1: "T6", team2: "T3", status: "0", tournamentId: "1", result: "Not yet started", venue: "Narhe", time : '30-07-2019' },
  { id: "10", team1: "T1", team2: "T3", status: "0", tournamentId: "5", result: "Not yet started", venue: "Hinjewadi", time : '30-07-2019' },
  { id: "11", team1: "T4", team2: "T1", status: "0", tournamentId: "5", result: "Not yet started", venue: "Lohgaon", time : '30-07-2019' },
  { id: "12", team1: "T1", team2: "T2", status: "0", tournamentId: "5", result: "Not yet started", venue: "Swargate", time : '30-07-2019' },
  { id: "13", team1: "T4", team2: "T2", status: "0", tournamentId: "1", result: "Not yet started", venue: "Kharadi", time : '30-07-2019' }
];
const pointsTable = [
  { id: "1", team: "T1", points: "2", tournamentId: "1"},
  { id: "2", team: "T2", points: "4", tournamentId: "2"},
  { id: "3", team: "T4", points: "0", tournamentId: "1" },
  { id: "4", team: "T1", points: "10", tournamentId: "1"},
  { id: "4", team: "T3", points: "6", tournamentId: "3"},
  { id: "5", team: "T2", points: "2", tournamentId: "3"},
  { id: "6", team: "T7", points: "4", tournamentId: "1"},
  { id: "7", team: "T2", points: "2", tournamentId: "4"},
  { id: "8", team: "T2", points: "6", tournamentId: "4"},
  { id: "9", team: "T6", points: "2", tournamentId: "1"},
  { id: "10", team: "T1", points: "10", tournamentId: "5"},
  { id: "11", team: "T4", points: "2", tournamentId: "5"},
  { id: "12", team: "T1", points: "4", tournamentId: "5"},
  { id: "13", team: "T4", points: "4", tournamentId: "1"}
];
var liveMatches = [
  { id : 1, teamBat1: 'Team Adali', teamBat2:'Team Malewad', venue: 'Malewad', tournamentId: '1'},
  { id : 2, teamBat1: 'Team Bhedshi', teamBat2:'Team Adali', venue: 'Adali', tournamentId: '4'},
  { id : 3, teamBat1: 'Team Malewad', teamBat2:'Team Bhedshi', venue: 'Malewad', tournamentId: '5'}
];
var liveScores = [
  { id : 1, score: "{runs:15,wickets:1,overs:2.2,batsmanStrike:'Adalitlo Gandel-10(5)',batsmanNonStrike:'Adalitlo Barako-1(2)',bowler:'Aditya-1(2)'}", target: '70/5-6'},
  { id : 2, score: "{runs:75,wickets:2,overs:5.0,batsmanStrike:'Bhedshitlo Gandel-30(15)',batsmanNonStrike:'Bhedshitlo Barako-20(12)',bowler:'Aditya-10(6)'}", target: ''},
  { id : 2, score: "{runs:50,wickets:4,overs:4.0,batsmanStrike:'Aditya-20(5)',batsmanNonStrike:'Sitaram-20(4)',bowler:'Barako-20(6)'}", target: ''}
];

/* GET home page. */

router.get('/tournaments', function(req, res, next) {
  db.simpleQuery("SELECT * FROM TOURNAMENTS WHERE STATUS = 'approved'").then( tournaments => res.json(tournaments))
});

router.get('/myTournaments', function(req, res, next) {
  console.log(req.query.teamId);
  db.simpleQuery("SELECT * FROM TOURNAMENTS WHERE TEAMID = ?",req.query.teamId).then( tournaments => res.json(tournaments))
});

router.get('/tournaments/:id', async function(req, res, next) {
  let tournaments = await db.simpleQuery("SELECT * FROM TOURNAMENTS");
  let tournament = tournaments.find( tournament => tournament.id == req.params.id);
  res.json(tournament);
});
router.delete('/tournaments/:id', async function(req, res, next) {
  db.simpleQuery("DELETE FROM tournaments WHERE id = ?",req.params.id).then(
  () => res.json({message:'Tournament deleted successfully!'}),
  (err) => next(err)
)
});
router.patch('/tournaments', function(req, res, next) {
  let value = req.body;
  db.simpleQuery(`UPDATE tournaments SET name='${value.name}',playerCount=${value.name},
  entryFee=${value.name},reEntryFee=${value.name},firstPrize='${value.name}',
  secondPrize='${value.name}',startDate='${value.name}',endDate='${value.name}',
  time='${value.name}' WHERE id = ?`,req.params.id).then(
  () => res.json({message:'Tournament updated successfully!'}),
  (err) => next(err)
  )
});
router.get('/fixtures', function(req, res, next) {
  let fixtureArray = fixtures.filter( fixture => fixture.tournamentId == req.query.tournamentId);
  res.json(fixtureArray);
});

router.get('/pointsTable', function(req, res, next) {
  let pointsTableArray = pointsTable.filter( p => p.tournamentId == req.query.tournamentId);
  res.json(pointsTableArray);
});

router.post('/save', function(req, res, next) {
  let value = req.body;
  db.simpleQuery(`INSERT INTO tournaments (teamId, name, playerCount, entryFee, 
  reEntryFee, firstPrize, secondPrize, startDate, endDate, time, status) VALUES
  ('${value.teamId}','${value.name}',${value.playerCount},${value.entryFee},
    ${value.reEntryFee},'${value.prize1}','${value.prize2}',
    '${value.startDate}','${value.endDate}','${value.time}','pending')
  `).then(
    () => res.json({message:'tournament created successfully!'}),
    (err) => next(err)
  )

});

module.exports = router;

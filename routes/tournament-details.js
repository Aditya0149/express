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
router.patch('/tournaments/:id', function(req, res, next) {
  let value = req.body;
  db.simpleQuery(`UPDATE tournaments SET name='${value.name}',playerCount=${value.playerCount},
  entryFee=${value.entryFee},reEntryFee=${value.reEntryFee},firstPrize='${value.prize1}',
  secondPrize='${value.prize2}',startDate='${value.startDate}',endDate='${value.endDate}',
  time='${value.time}' WHERE id = ?`,req.params.id).then(
  () => res.json({message:'Tournament updated successfully!'}),
  (err) => next(err)
  )
});
router.get('/fixtures/:id', function(req, res, next) {
  console.log('fixtures ',req.params.id)
  db.simpleQuery("SELECT * FROM fixtures WHERE tournamentId = ?",req.params.id).then( fixtures => res.json(fixtures))
});
router.delete('/fixtures/:id', function(req, res, next) {
  db.simpleQuery("DELETE FROM fixtures WHERE id = ?",req.params.id).then(
    () => res.json({message:'Fixture deleted successfully!'}),
    (err) => next(err)
  )
});

router.post('/fixtures', function(req, res, next) {
  let value = req.body;
  db.simpleQuery(`INSERT INTO fixtures (team1Id, team1Name, team2Id, team2Name, date, time, 
    tournamentId) VALUES
  ('${value.team1Id}','${value.team1Name}','${value.team2Id}','${value.team2Name}','${value.date}','${value.time}',
    ${value.tournamentId})
  `).then(
    () => res.json({message:'fixtures added!'}),
    (err) => next(err)
    )
});

router.patch('/fixtures/changeStatus/:id', function(req, res, next) {
  db.simpleQuery(`UPDATE fixtures SET status='${req.body.status}' WHERE id = ?`,req.params.id).then(
  () => res.json({message:'Fixture updated!'}),
  (err) => next(err)
  )
});

router.get('/pointsTable/:id', function(req, res, next) {
  db.simpleQuery("SELECT * FROM points_table WHERE tournamentId = ?",req.params.id).then( pointsTable => res.json(pointsTable));
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

router.post('/joinRequest', function(req, res, next) {
  let value = req.body;
  db.simpleQuery("SELECT * FROM join_requests WHERE fromTeamId = ? AND toTournamentId = ?",value.fromTeamId, value.toTournamentId).then(
    (requests) => {
      if(requests.length) next({message:"You have already sent a request for this tournament.",status: 409});
      else {
        db.simpleQuery(`INSERT INTO join_requests (fromTeamId, fromTeamName, toTournamentId, toTournamentName, toTeamId) VALUES
        ('${value.fromTeamId}','${value.fromTeamName}','${value.toTournamentId}', '${value.toTournamentName}', '${value.toTeamId}')
        `).then(
          () => res.json({message:'Join request sent'}),
          (err) => next(err)
        )
      }
    }
  )
});

router.post('/acceptRequest', async function(req, res, next) {
  let value = req.body;
  let acceptResp = await db.simpleQuery(`UPDATE join_requests SET status='accepted' where id = ?`,value.id);
  let pointsTable = await db.simpleQuery(`INSERT INTO points_table (teamId, teamName, tournamentId) VALUES
    ('${value.teamId}','${value.teamName}','${value.tournamentId}')
  `)
  res.json({message:'Team added to the tournament'});
});

router.get('/joinRequest/:toTeamId', function(req, res, next) {
  db.simpleQuery("SELECT * FROM join_requests WHERE toTeamId = ?",req.params.toTeamId).then(
    (requests) => res.json(requests),
    (err) => next(err)
  )
});

router.delete('/joinRequest/:id', function(req, res, next) {
  db.simpleQuery("DELETE FROM join_requests WHERE id = ?",req.params.id).then(
    () => res.json({message:'Join request rejected'}),
    (err) => next(err)
  )
});

module.exports = router;

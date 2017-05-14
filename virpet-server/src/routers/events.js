const express = require('express');
const bodyParser = require('body-parser');

const eventModel = require('../model/events.js');

const router = express.Router();

router.use(bodyParser.json());

//list
router.get('/events',function(req,res,next) {
	console.log('in event.js/router.get');
	console.log(req.query.searchText);
	console.log(req.query.unaccomplishedOnly);
	console.log(req.query.days);
	eventModel.listEvents(req.query.searchText,req.query.unaccomplishedOnly,req.query.days).then(events => {
		res.json(events);
	}).catch(next);
});

//create

router.post('/events',function(req,res,next) {
	console.log('in event.js/router.post');
	const {eventTitle,eventStartDate,eventEndDate,eventDescript} = req.body;
	if (!eventTitle || ! eventStartDate || !eventEndDate || !eventDescript) {
		const err = new Error('Date incomplete');
		err.status = 400;
		throw err;
	}
	eventModel.createEvent(eventTitle,eventStartDate,eventEndDate,eventDescript).then(events => {
		console.log('event created:' , events);
		res.json(events);
	}).catch(next);
});
module.exports = router;

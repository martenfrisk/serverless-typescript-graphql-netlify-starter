import axios from 'axios'
import eventsNextTransform from './EventsNextTransform';
import { createResolver, DATA_PROPS } from '../ResolverFactory';
import { userInputErrorDispatcher } from '../../errors/ErrorDispatcher'

const aggregate = async(_, args, ctx) => {
	let url;
	if (args.teamId) {
			url = `${ctx.baseUrl}eventsnext.php?id=${args.teamId}`;
	} else if (args.leagueId) {
			url = `${ctx.baseUrl}eventsnextleague.php?id=${args.leagueId}`;
	} else {
			return userInputErrorDispatcher('Cannot search Team: teamId or leagueId not provided.');
	}

	const res = await axios.get(url);

	return res.data;
};

const resolver = createResolver({
		dataField: DATA_PROPS.EVENT,
		aggregate,
		transform: eventsNextTransform
});

export default resolver;

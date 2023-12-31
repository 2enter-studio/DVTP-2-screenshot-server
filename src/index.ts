import WebSocket from 'ws';
import 'dotenv/config';
import config from './config.js';
import { ScreenshotTaker } from './lib/screenshot.js';
import * as db from './lib/database.js';
import validator from 'validator';
import { crop } from './lib/crop-img.js';

const WS_URL = process.env.WS_URL as string;

const IMG_PATH_ROOT = config.img_path_root;
const screenshot_taker = new ScreenshotTaker(IMG_PATH_ROOT);

await db.connect_to_db().then((res) => res.text().then(console.log));

let ws = new WebSocket(WS_URL);

const { EXHIBITION_LOCATION } = process.env;
console.log(`Exhibition Location:\t${EXHIBITION_LOCATION}`);

// if (EXHIBITION_LOCATION === 'moca') {
// 	console.log('Exhibition Location MOCA is being fixed, exiting...');
// 	process.exit(1);
// }

const ws_connect = () => {
	ws = new WebSocket(WS_URL);

	ws.on('error', (err: unknown) => {
		console.log(err);
	});

	ws.on('open', () => {
		ws.send('Screenshot server connected');
	});

	ws.on('close', () => {
		console.log('Websocket connection broke, trying to reconnect...');
		ws_connect();
	});

	ws.on('message', async (data) => {
		if (validator.isJSON(data.toString())) {
			const parsed_data = JSON.parse(data.toString());
			if (!parsed_data._id) {
				console.log('Invalid data received');
				return;
			}

			if (parsed_data.location !== EXHIBITION_LOCATION) {
				console.log(`Invalid location received:\t${parsed_data.location}`);
				return;
			}
			const answer_id = parsed_data._id;

			await screenshot_taker.take_shot(answer_id).then(async (img_path) => {
				await crop(img_path).then(async (data) => {
					console.log('done!');
					await db.upload_screenshot(answer_id, data).then((res) => {
						res.text().then(console.log);
					});
				});
			});
		} else {
			console.log(`Invalid data received:\t${data.toString()}`);
		}
	});
};
ws_connect();

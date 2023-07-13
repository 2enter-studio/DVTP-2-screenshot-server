import WebSocket from 'ws';
import 'dotenv/config';
import config from './config.js';
import { ScreenshotTaker } from './lib/screenshot.js';
import * as db from './lib/database.js';
import validator from 'validator';

const WS_URL = process.env.WS_URL as string;

const IMG_PATH_ROOT = config.img_path_root;
const screenshot_taker = new ScreenshotTaker(IMG_PATH_ROOT);

await db.connect_to_db().then((res) => res.text().then(console.log));

const ws = new WebSocket(WS_URL);
ws.on('error', (err) => {
	console.log(err);
});
ws.on('open', () => {
	ws.send('Screenshot server connected');
});
ws.on('message', async (data) => {
	if (validator.isJSON(data.toString())) {
		const parsed_data = JSON.parse(data.toString());
		if (!parsed_data._id) {
			console.log('Invalid data received');
			return;
		}
		const answer_id = parsed_data._id;

		await screenshot_taker.take_shot(answer_id).then(async (img_path) => {
			await db.upload_screenshot(answer_id, img_path).then((res) => res.text().then(console.log));
		});
	} else {
		console.log(`Invalid data received: ${data.toString()}`);
	}
});

import screenshot from 'screenshot-desktop';
import WebSocket from 'ws';
import 'dotenv/config';
import config from './config.js';

const WS_URL = process.env.WS_URL as string;

const IMG_PATH_ROOT = config.img_path_root;

let n: number = 0;

const ws = new WebSocket(WS_URL);
ws.on('error', (err) => {
	console.log(err);
});
ws.on('open', () => {
	console.log('connected');
});
ws.on('message', (data) => {
	console.log(data);
});

// setInterval(() => {
// 	screenshot({ filename: `${IMG_PATH_ROOT}/${n}.jpg` }).then((imgPath) => {
// 		console.log(imgPath);
// 		n++;
// 	});
// }, 10000);

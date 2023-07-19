import sharp from 'sharp';
// const sharp = require('sharp');
import 'dotenv/config';
import { upload_cropped_screenshot } from './database.js';

const left_offset = process.env.LEFT_OFFSET as string;
const top_offset = process.env.TOP_OFFSET as string;
const width = process.env.IMG_WIDTH as string;
const height = process.env.IMG_HEIGHT as string;

const args = {
	left: parseInt(left_offset),
	top: parseInt(top_offset),
	width: parseInt(width),
	height: parseInt(height)
};

export const crop = async (img_src: string) => {
	return sharp(img_src).extract(args).toBuffer();
};

// crop('./images/2yEMRXSp9u.jpg').then((data) => {
// 	console.log(data);
// });
// crop('./images/2yEMRXSp9u.jpg')

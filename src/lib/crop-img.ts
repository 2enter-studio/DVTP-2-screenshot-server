import sharp from 'sharp';
import 'dotenv/config';

const { LEFT_OFFSET, TOP_OFFSET, IMG_WIDTH, IMG_HEIGHT } = process.env;

const args = {
	left: parseInt(LEFT_OFFSET as string),
	top: parseInt(TOP_OFFSET as string),
	width: parseInt(IMG_WIDTH as string),
	height: parseInt(IMG_HEIGHT as string)
};

console.log(args);

export const crop = async (img_src: string) => {
	return sharp(img_src).extract(args).toBuffer();
};

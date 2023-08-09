import 'dotenv/config';
import mongoose, { Schema } from 'mongoose';
import type { ConnectOptions } from 'mongoose';
import fs from 'fs';

const MONGO_URI = process.env.MONGO_URI as string;

const AnswerSchema = new Schema({
	_id: Schema.Types.ObjectId,
	answer: String,
	news_id: String,
	date: Date,
	screenshot: Buffer
});

const AnswerModel = mongoose.model('answers', AnswerSchema);

export const connect_to_db = async () => {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		} as ConnectOptions);

		return new Response('Connected to MongoDB');
	} catch (err: unknown) {
		return new Response('Something went wrong in Database', { status: 500 });
	}
};

export const upload_screenshot = async (id: string, img_path: string) => {
	const filter = { _id: id };
	const update = { screenshot: fs.readFileSync(img_path) };
	await AnswerModel.findOneAndUpdate(filter, update);
	return new Response(`Screenshot for ${id} uploaded`, { status: 200 });
};
export const upload_cropped_screenshot = async (id: string, img_buffer: Buffer) => {
	await fetch('https://dvtp2.2enter.art/api/screenshot', {
		method: 'POST',
		body: JSON.stringify({ id, screenshot: img_buffer })
	});
	// const filter = { _id: id };
	// const update = { screenshot: img_buffer };
	// await AnswerModel.findOneAndUpdate(filter, update);
	return new Response(`Screenshot for ${id} uploaded`, { status: 200 });
};

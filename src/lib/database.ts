import 'dotenv/config';
import mongoose, { Schema } from 'mongoose';
import type { ConnectOptions } from 'mongoose';

const { MONGO_URI } = process.env;

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
		await mongoose.connect(
			MONGO_URI as string,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true
			} as ConnectOptions
		);

		return new Response('Connected to MongoDB');
	} catch (err: unknown) {
		return new Response('Something went wrong in Database', { status: 500 });
	}
};

export const upload_screenshot = async (id: string, img_buffer: Buffer) => {
	// await fetch(request_url, {
	// 	method: 'POST',
	// 	body: JSON.stringify({ id, screenshot: img_buffer })
	// });
	const filter = { _id: id };
	const update = { screenshot: img_buffer };
	await AnswerModel.findOneAndUpdate(filter, update);
	return new Response(`Screenshot for ${id} uploaded`, { status: 200 });
};

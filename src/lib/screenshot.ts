import screenshot from 'screenshot-desktop';
export class ScreenshotTaker {
	img_path_root: string;

	constructor(img_path_root: string) {
		this.img_path_root = img_path_root;
	}
	take_shot = async (img_name: string) => {
		const img_path = `${this.img_path_root}/${img_name}.jpg`;
		await screenshot({ filename: img_path });
		return img_path;
	};
}

import screenshot from 'screenshot-desktop';

const img_root = './images';
let n = 0;


setInterval(() => {
	screenshot({ filename: `${img_root}/${n}.jpg` }).then((imgPath) => {
		console.log(imgPath);
		n++;
	});
}, 10000)

import filepicker from 'filepicker-js';


export class FileStorageService {

    constructor(key) {
	filepicker.setKey(key);
    }

    selectImageWithWidgetToService() {
	return new Promise(
	    (resolve, reject) => {
		filepicker.pick({
		    mimetype: 'image/*',
		    services: ['CONVERT', 'COMPUTER'],
		    conversions: ['crop', 'rotate', 'filter'],
		    cropRatio: 4/3
		}, (blob) => {
		    resolve(blob.url);
		}, (error) => {
		    reject(error);
		});
	    });
    }
}

import filepicker from 'filepicker-js';


export class FileStorageService {

    constructor(key) {
	filepicker.setKey(key);
    }

    selectImageWithWidgetToService() {
	return new Promise(
	    (resolve, reject) => {
		filepicker.pick({
		    mimetype: 'image/*'
		}, (blob) => {
		    resolve(blob.url);
		}, (error) => {
		    reject(error);
		});
	    });
    }
}

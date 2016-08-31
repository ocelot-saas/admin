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
		    services: ['CONVERT', 'COMPUTER', 'FACEBOOK', 'DROPBOX', 'FLICKR', 'IMAGE_SEARCH', 'URL'],
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

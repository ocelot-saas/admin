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
                    services: ['CONVERT', 'COMPUTER', 'FACEBOOK', 'DROPBOX', 'FLICKR'],
                    conversions: ['crop', 'rotate', 'filter'],
                    imageDim: [1600, 900],
                    cropRatio: 16/9,
                    cropForce: true,
                }, (blob) => {
		    filepicker.convert(blob, {
			width: 1600,
			height: 900,
			fit: 'scale',
			format: 'jpg',
			compress: true,
			quality: 90,
		    }, (newBlob) => {
                        resolve({
                            uri: newBlob.url,
                            width: 1600,
                            height: 900
                        });
                    }, (error) => {
                        reject(error);
                    });
                }, (error) => {
                    reject(error);
                });
            });
    }
}

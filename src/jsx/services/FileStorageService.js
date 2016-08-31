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
                    imageMin: [800, 450],
                    imageMax: [1600, 900],
                    imageDim: [1600, 900],
                    cropRatio: 16/9,
                    cropForce: true,
                }, (blob) => {
                    filepicker.stat(blob, {
                        width: true,
                        height: true,
                    }, (metadata) => {
                        resolve({
                            url: blob.url,
                            width: metadata.width,
                            height: metadata.height
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

import React from 'react';
import update from 'react-addons-update';
import { Row, Col, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import { fileStorageService} from '../services';

class ImageGallery extends React.Component {
    
    constructor(props, context) {
        super(props, context);
        this.state = {
            images: [{
                url: '/img/mood01.jpg'
            }, {
                url: '/img/mood02.jpg'
            }, {
                url: '/img/mood03.jpg'
            }, {
                url: '/img/mood04.jpg'
            }, {
                url: '/img/mood05.jpg'
            }]
        };
    }

    handleImageUpload() {
        fileStorageService
	    .selectImageWithWidgetToService()
	    .then((imUrl) => {
	        this.setState({
		    images: update(this.state.images, {$push: [{
		        url: imUrl
		    }]})
                });
	    })
	    .catch((error) => {
	        console.log(error);
            });
    }

    render() {
        var rows = this.state.images.map((im) =>
            <Col key={ im.url } lg={ 4 }>
                <img src={ im.url } className="img-thumbnail img-responsive" />
            </Col>
        );

        return (
            <div>
                <Row>
                    {rows}
                </Row>
                <Row>
                    <Col lg={ 12 }>
                        <Button bsClass="btn btn-labeled btn-success mr" onClick={this.handleImageUpload.bind(this)}>
                            <span className="btn-label"><i className="icon-plus"></i></span> Add
                        </Button>
			    
                        <Dropzone
                            accept="image/*"
                            className="image-gallery-dropzone" >
                            <Button bsClass="btn btn-labeled btn-success mr">
                                <span className="btn-label"><i className="icon-plus"></i></span> Add
                            </Button>
                            <div className="image-gallery-info">Click anywhere or drag an image to upload</div>
                        </Dropzone>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ImageGallery;

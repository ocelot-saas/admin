import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { fileStorageService} from '../services';

class ImageGallery extends React.Component {
    
    handleImageUpload() {
        fileStorageService
	    .selectImageWithWidgetToService()
	    .then((im) => {
	        this.props.onImageAdded(im);
	    })
	    .catch((error) => {
	        console.log(error);
            });
    }

    render() {
        var rows = this.props.imageSet.map((im) =>
            <Col key={ im.uri } lg={ 4 }>
                <img src={ im.uri } className="img-thumbnail img-responsive" />
            </Col>
        );

        return (
            <div>
                <Row>
                    {rows}
                </Row>
                <Row>
                    <Col lg={ 12 }>
		        <div
			    className="image-gallery-dropzone"
			    onClick={this.handleImageUpload.bind(this)}>
                            <Button bsClass="btn btn-labeled btn-success mr">
                                <span className="btn-label"><i className="icon-plus"></i></span> Add
                            </Button>
                            <div className="image-gallery-info">Click anywhere to upload</div>
			</div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ImageGallery;

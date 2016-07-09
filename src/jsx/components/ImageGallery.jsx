import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';

var Source = {
    ALREADY_EXISTS: 0,
    TO_UPLOAD: 1
}

class ImageGallery extends React.Component {
    
    constructor(props, context) {
        super(props, context);
        this.state = {
            images: [{
                url: '/img/mood01.jpg',
                source: Source.ALREADY_EXISTS
            }, {
                url: '/img/mood02.jpg',
                source: Source.ALREADY_EXISTS
            }, {
                url: '/img/mood03.jpg',
                source: Source.ALREADY_EXISTS
            }, {
                url: '/img/mood04.jpg',
                source: Source.ALREADY_EXISTS
            }, {
                url: '/img/mood05.jpg',
                source: Source.ALREADY_EXISTS
            }]
        };
    }

    addFilesToUpload(files) {
        // TODO(horia141): filter for uniqueness.
        files.forEach((f) => this.state.images.push({
            file: f,
            source: Source.TO_UPLOAD
        }));

        this.setState({
            images: this.state.images
        });
    }

    render() {
        var rows = this.state.images.map((im) =>
            im.source == Source.ALREADY_EXISTS
                                             ? <Col key={ im.url } lg={ 4 }>
                                                 <img src={ im.url } className="img-thumbnail img-responsive" />
                                             </Col>
                                             : <Col key={ im.file.name } lg={ 4 }>
                                                 <img src={ im.file.preview } className="img-thumbnail img-responsive" />
                                             </Col>
        );

        return (
            <div>
                <Row>
                    {rows}
                </Row>
                <Row>
                    <Col lg={ 12 }>
                        <Dropzone
                            accept="image/*"
                            onDrop={ this.addFilesToUpload.bind(this) }
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

import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, ButtonGroup, Input, FormControl } from 'react-bootstrap';

class General extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: 'Horia\'s Kitchen',
      desc: 'Fancy french restaurant',
      address: 'Sector 2, Bucharest',
      monFriNonStop: false,
      monFriStart: '07:00 AM',
      monFriEnd: '10:00 PM',
    };
  }

  componentDidMount() {
    $('#dtp-mon-fri-start').datetimepicker({format: 'hh:mm A'});
    $('#dtp-mon-fri-start').on('dp.change', this.handleMonFriStartChange.bind(this));
    $('#dtp-mon-fri-stop').datetimepicker({format: 'LT'});
    $('#dtp-mon-fri-stop').on('dp.change', this.handleMonFriStopChange.bind(this));
    $('#dtp-sat-start').datetimepicker({format: 'LT'});
    $('#dtp-sat-stop').datetimepicker({format: 'LT'});
    $('#dtp-sun-start').datetimepicker({format: 'LT'});
    $('#dtp-sun-stop').datetimepicker({format: 'LT'});
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleDescChange(e) {
    this.setState({
      desc: e.target.value
    });
  }

  handleAddressChange(e) {
    this.setState({
      address: e.target.value
    });
  }

  handleMonFriNonStopChange(e) {
    this.setState({
      monFriNonStop: e.target.checked
    });
  }

  handleMonFriStartChange(e) {
    var monFriStart;
    if (e.hasOwnProperty('date')) {
      // Set through datetimepicker.
      monFriStart = e.date.format('hh:mm A');
    } else {
      // Set through manually editing the field.
      monFriStart = e.target.value;
    }

    this.setState({
      monFriStart: monFriStart
    });
  }

  handleMonFriEndChange(e) {
    var monFriEnd;
    if (e.hasOwnProperty('date')) {
      // Set through datetimepicker.
      monFriEnd = e.date.format('hh:mm A');
    } else {
      // Set through manually editing the field.
      monFriEnd = e.target.value;
    }

    this.setState({
      monFriEnd: monFriEnd
    });
  }

  render() {
    return (
      <ContentWrapper>
        <h3>
          General
          <small>Restaurant general settings</small>
        </h3>
        <Row>
          <Col sm={ 12 }>
            <div className="panel panel-default">
              <div className="panel-heading">General</div>
              <div className="panel-body">
	        <form className="form-horizontal">
		  <div className="form-group">
		    <label className="col-lg-2 control-label">Name</label>

		    <Col lg={ 10 }>
		      <Input
		        standalone
			type="text"
			value={ this.state.name }
			onChange={ this.handleNameChange.bind(this) }
			required="required"
			placeholder="Name"
			className="form-control" />
		    </Col>
		  </div>

		  <div className="form-group">
		    <label className="col-lg-2 control-label">Description</label>
		    <Col lg={ 10 }>
		      <textarea
			value={ this.state.desc }
			onChange={ this.handleDescChange.bind(this) }
			required="required"
			placeholder="Description"
			rows="5"
			className="form-control" />
		    </Col>
		  </div>

		  <div className="form-group">
		    <label className="col-lg-2 control-label">Address</label>
		    <Col lg={ 10 }>
		      <Input
		        standalone
			type="text"
			value={ this.state.address }
			onChange={ this.handleAddressChange.bind(this) }
			required="required"
			placeholder="Address"
			className="form-control" />
		    </Col>
		  </div>
		</form>
	      </div>
              <div className="panel-footer">
                <Button bsClass="btn btn-labeled btn-primary mr">
		  <span className="btn-label"><i className="fa fa-check"></i></span> Save
		</Button>
                <Button bsClass="btn btn-labeled mr">
		  <span className="btn-label"><i className="fa fa-times"></i></span> Revert
		</Button>
              </div>
            </div>
	  </Col>
	</Row>

        <Row>
          <Col sm={ 12 }>
            <div className="panel panel-default">
              <div className="panel-heading">Opening Hours</div>
              <div className="panel-body">
	        <form className="form-horizontal">

		  { /* Monday to Friday opening times */ }
                  <div className="form-group">
                    <label className="col-lg-2 col-xs-12 control-label">Mon-Fri</label>
                    <Col lg={ 2 } xs={ 4 }>
                      <div className="checkbox c-checkbox">
                        <label>
                          <input
			    standalone
			    type="checkbox"
			    checked={ this.state.monFriNonStop }
			    onChange={ this.handleMonFriNonStopChange.bind(this) } />
                          <em className="fa fa-check"></em>Non-stop
			</label>
                      </div>
                    </Col>
		    <Col lg={ 4 } xs={ 4 }>
                      <div id="dtp-mon-fri-start" className="input-group date">
                        <input
			  type="text"
			  disabled={ this.state.monFriNonStop }
			  value={ this.state.monFriStart }
			  onChange={ this.handleMonFriStartChange.bind(this) }
			  className="form-control" />
                        <span className="input-group-addon">
                          <span className="fa fa-clock-o"></span>
                        </span>
                      </div>
		    </Col>
		    <Col lg={ 4 } xs={ 4 }>
                      <div id="dtp-mon-fri-stop" className="input-group date">
                        <input
			  type="text"
			  disabled={ this.state.monFriNonStop }
			  value={ this.state.monFriEnd }
			  onChange={ this.handleMonFriEndChange.bind(this) }
			  className="form-control" />
                        <span className="input-group-addon">
                          <span className="fa fa-clock-o"></span>
                        </span>
                      </div>
		    </Col>
		  </div>

		  { /* Saturday opening times */ }
                  <div className="form-group">
                    <label className="col-lg-2 col-xs-12 control-label">Saturday</label>
                    <Col lg={ 2 } xs={ 4 }>
                      <div className="checkbox c-checkbox">
                        <label>
                          <input standalone type="checkbox" />
                          <em className="fa fa-check"></em>Non-stop
			</label>
                      </div>
                    </Col>
		    <Col lg={ 4 } xs={ 4 }>
                      <div id="dtp-sat-start" className="input-group date">
                        <input type="text" className="form-control" />
                        <span className="input-group-addon">
                          <span className="fa fa-clock-o"></span>
                        </span>
                      </div>
		    </Col>
		    <Col lg={ 4 } xs={ 4 }>
                      <div id="dtp-sat-stop" className="input-group date">
                        <input type="text" className="form-control" />
                        <span className="input-group-addon">
                          <span className="fa fa-clock-o"></span>
                        </span>
                      </div>
		    </Col>
		  </div>

		  { /* Sunday opening times */ }
                  <div className="form-group">
                    <label className="col-lg-2 col-xs-12 control-label">Sunday</label>
                    <Col lg={ 2 } xs={ 4 }>
                      <div className="checkbox c-checkbox">
                        <label>
                          <input standalone type="checkbox" />
                          <em className="fa fa-check"></em>Non-stop
			</label>
                      </div>
                    </Col>
		    <Col lg={ 4 } xs={ 4 }>
                      <div id="dtp-sun-start" className="input-group date">
                        <input type="text" className="form-control" />
                        <span className="input-group-addon">
                          <span className="fa fa-clock-o"></span>
                        </span>
                      </div>
		    </Col>
		    <Col lg={ 4 } xs={ 4 }>
                      <div id="dtp-sun-stop" className="input-group date">
                        <input type="text" className="form-control" />
                        <span className="input-group-addon">
                          <span className="fa fa-clock-o"></span>
                        </span>
                      </div>
		    </Col>
		  </div>
		</form>
	      </div>
              <div className="panel-footer">
                <Button bsClass="btn btn-labeled btn-primary mr">
		  <span className="btn-label"><i className="fa fa-check"></i></span> Save
		</Button>
                <Button bsClass="btn btn-labeled mr">
		  <span className="btn-label"><i className="fa fa-times"></i></span> Revert
		</Button>
              </div>
            </div>
	  </Col>
	</Row>

        <Row>
          <Col sm={ 12 }>
            <div className="panel panel-default">
              <div className="panel-heading">Pictures</div>
              <div className="panel-body">Stuff</div>
              <div className="panel-footer">
                <Button bsClass="btn btn-labeled btn-primary mr">
		  <span className="btn-label"><i className="fa fa-check"></i></span> Save
		</Button>
                <Button bsClass="btn btn-labeled mr">
		  <span className="btn-label"><i className="fa fa-times"></i></span> Revert
		</Button>
              </div>
            </div>
	  </Col>
	</Row>
      </ContentWrapper>
    );
  }
}

export default General;

import React from 'react';
import { Col } from 'react-bootstrap';

class HoursRange extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      nonStop: false,
      start: '07:00 AM',
      end: '10:00 PM'
    };
  }

  _updateOwner() {
    if (!this.props.hasOwnProperty('onChange')) {
      return;
    }

    this.props.onChange({
      nonStop: this.state.nonStop,
      start: this.state.start,
      end: this.state.end
    });
  }

  componentDidMount() {
    $(`#dtp-start-${this.props.xid}`).datetimepicker({format: 'hh:mm A'});
    $(`#dtp-start-${this.props.xid}`).on('dp.change', this.handleStartChange.bind(this));
    $(`#dtp-end-${this.props.xid}`).datetimepicker({format: 'LT'});
    $(`#dtp-end-${this.props.xid}`).on('dp.change', this.handleEndChange.bind(this));
  }

  handleNonStopChange(e) {
    this.setState({
      nonStop: e.target.checked
    });

    this._updateOwner();
  }

  handleStartChange(e) {
    var start;
    if (e.hasOwnProperty('date')) {
      // Set through datetimepicker.
      start = e.date.format('hh:mm A');
    } else {
      // Set through manually editing the field.
      start = e.target.value;
    }

    this.setState({
      start: start
    });

    this._updateOwner();
  }

  handleEndChange(e) {
    var end;
    if (e.hasOwnProperty('date')) {
      // Set through datetimepicker.
      end = e.date.format('hh:mm A');
    } else {
      // Set through manually editing the field.
      end = e.target.value;
    }

    this.setState({
      end: end
    });

    this._updateOwner();
  }

  render() {
    return (
      <div className="form-group">
        <label className="col-lg-2 col-xs-12 control-label">{ this.props.label }</label>
        <Col lg={ 2 } xs={ 4 }>
          <div className="checkbox c-checkbox">
            <label>
              <input
                standalone
                type="checkbox"
                checked={ this.state.nonStop }
                onChange={ this.handleNonStopChange.bind(this) } />
              <em className="fa fa-check"></em>Non-stop
            </label>
          </div>
        </Col>
        <Col lg={ 4 } xs={ 4 }>
          <div id={ `dtp-start-${this.props.xid}` } className="input-group date">
            <input
              type="text"
              disabled={ this.state.nonStop }
              value={ this.state.start }
              onChange={ this.handleStartChange.bind(this) }
              className="form-control" />
            <span className="input-group-addon">
              <span className="fa fa-clock-o"></span>
            </span>
          </div>
        </Col>
        <Col lg={ 4 } xs={ 4 }>
          <div id={ `dtp-end-${this.props.xid}` } className="input-group date">
            <input
              type="text"
              disabled={ this.state.nonStop }
              value={ this.state.end }
              onChange={ this.handleEndChange.bind(this) }
              className="form-control" />
            <span className="input-group-addon">
              <span className="fa fa-clock-o"></span>
            </span>
          </div>
        </Col>
      </div>
    );
  }
}

export default HoursRange;

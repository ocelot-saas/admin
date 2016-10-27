import React from 'react';
import { Col } from 'react-bootstrap';

export class HoursRange extends React.Component {

    componentDidMount() {
        // $(`#dtp-start-${this.props.xid}`).datetimepicker({format: 'hh:mm A'});
        // $(`#dtp-start-${this.props.xid}`).on('dp.change', this.handleStartChange.bind(this));
        // $(`#dtp-end-${this.props.xid}`).datetimepicker({format: 'LT'});
        // $(`#dtp-end-${this.props.xid}`).on('dp.change', this.handleEndChange.bind(this));
    }

    handleNonStopChange(e) {
        this.props.onChange({
            nonStop: e.target.checked,
            start: this.props.hours.start,
            end: this.props.hours.end
        });
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

        this.props.onChange({
            nonStop: this.props.hours.nonStop,
            start: start,
            end: this.props.hours.end
        });
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

        this.props.onChange({
            nonStop: this.props.hours.nonStop,
            start: this.props.hours.start,
            end: end
        });
    }

    render() {
        return (
            <div className="form-group">
                <label className="col-lg-2 col-xs-12 control-label">{ this.props.xlabel }</label>
                <Col lg={ 2 } xs={ 4 }>
                    <div className="checkbox c-checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={ this.props.hours.nonStop }
                                onChange={ this.handleNonStopChange.bind(this) } />
                            <em className="fa fa-check"></em>Non-stop
                        </label>
                    </div>
                </Col>
                <Col lg={ 4 } xs={ 4 }>
                    <div id={ `dtp-start-${this.props.xid}` } className="input-group date">
                        <input
                            type="text"
                            disabled={ this.props.hours.nonStop }
                            value={ this.props.hours.start }
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
                            disabled={ this.props.hours.nonStop }
                            value={ this.props.hours.end }
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



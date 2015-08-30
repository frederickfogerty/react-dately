import React, { Component } from 'react';
import { Calendar } from '../src/react-dately';

class CalendarInput extends Component {

  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this._documentClickHandler = (e) => this._documentClick(e);
  }

  componentDidMount() {
    document.addEventListener('click', this._documentClickHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._documentClickHandler);
  }

  _documentClick(e) {
    const inputNode = React.findDOMNode(this.refs['input']);
    const calendarNode = React.findDOMNode(this.refs['calendar']);

    if(inputNode.contains(e.target)) {
      this.setState({isOpen: !this.state.isOpen});
    } else if(!calendarNode.contains(e.target)) {
      this.setState({isOpen: false});
    }
  }

  _handleCalendarClick(date) {
    this.props.onDateSelect(date);
    this.setState({isOpen: false});
  }

  render() {

    const { date, wrapperClassName, inputClassName, placeholder, calendarProps, hiddenValue, formatDate,  } = this.props;
    const value = placeholder ? (placeholder || null) : formatDate(date);

    return(
      <div className={wrapperClassName}>
        <input
          ref="input"
          type="text"
          className={inputClassName}
          aria-haspopup={true}
          aria-readonly={false}
          aria-expanded={this.state.isOpen}
          value={value}
          readOnly
        />
        <div ref="calendar">
        {
          this.state.isOpen &&
          <Calendar
            date={date}
            onDateSelect={this._handleCalendarClick.bind(this)}
            minDay={this.props.minDay}
            maxDay={this.props.maxDay}
            {...calendarProps}
          />
        }
        </div>
      </div>
    );
  }
}

CalendarInput.propTypes = {
  date: React.PropTypes.instanceOf(Date),
  wrapperClassName: React.PropTypes.oneOfType(
    [React.PropTypes.string, React.PropTypes.object]
  ),
  inputClassName: React.PropTypes.oneOfType(
    [React.PropTypes.string, React.PropTypes.object]
  ),
  placeholder: React.PropTypes.string,
  calendarProps: React.PropTypes.object,
  hiddenValue: React.PropTypes.bool,
  formatDate: React.PropTypes.func,
  onDateSelect: React.PropTypes.func
};

CalendarInput.defaultProps = {
  date: new Date(),
  wrapperClassName: 'cal__input',
  inputClassName: null,
  placeholder: null,
  minDay: new Date(),
  calendarProps: {
    modifiers: 'cal--small',
    trimWeekdays: 1
  },
  formatDate: date => date,
  onDateSelect: date => date
};

export default CalendarInput;
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import { defaultClasses } from './styles.js';

class DayCell extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      hover     : false,
      active    : false
    }

    this.styles = this.props.theme;
  }

  handleMouseEvent(event) {
    event.preventDefault();

    if (this.props.isPassive) return null;

    const newState = {};

    switch (event.type) {
      case 'mouseenter':
        newState['hover'] = true;
        break;

      case 'mouseup':
      case 'mouseleave':
        newState['hover'] = false;
        newState['active'] = false;
        break;

      case 'mousedown':
        newState['active'] = true;
        break;
    }

    this.setState(newState);
  }

  handleSelect(event) {
    event.preventDefault();

    if (this.props.isPassive) return null;

    this.props.onSelect(this.props.dayMoment);
  }

  getStateStyles() {
    const { hover, active } = this.state;
    const { isSelected, isInRange, isPassive, isStartEdge, isEndEdge, dayMoment, isToday } = this.props;
    const { styles } = this;

    const hoverStyle    = hover ? styles['DayHover'] : {};
    const activeStyle   = active ? styles['DayActive'] : {};
    const passiveStyle  = isPassive ? styles['DayPassive'] : {};
    const startEdgeStyle = isStartEdge ? styles['DayStartEdge'] : {};
    const endEdgeStyle   = isEndEdge ? styles['DayEndEdge'] : {};
    const selectedStyle = isSelected ? styles['DaySelected'] : {};
    const inRangeStyle  = isInRange ? styles['DayInRange'] : {};
    const todayStyle    = isToday ? styles['DayToday'] : {};

    return {
      ...todayStyle,
      ...inRangeStyle,
      ...hoverStyle,
      ...passiveStyle,
      ...activeStyle,
      ...selectedStyle,
      ...startEdgeStyle,
      ...endEdgeStyle
    };
  }

  getClassNames(classes) {
    const { isSelected, isInRange, isPassive, isStartEdge, isEndEdge, isToday } = this.props;

    return classnames({
      [classes.day]       : true,
      [classes.dayActive] : isSelected,
      [classes.dayPassive]: isPassive,
      [classes.dayInRange]: isInRange,
      [classes.dayStartEdge] : isStartEdge,
      [classes.dayEndEdge] : isEndEdge,
      [classes.dayToday] : isToday
    });

  }

  render() {
    const { dayMoment, dayText, onlyClasses, classNames, showText } = this.props;

    const { styles } = this;
    const stateStyle = this.getStateStyles();
    const classes    = this.getClassNames(classNames);

    return (
      <span
        style={{...styles['DayCell']}}>
        <span
          onMouseEnter={ this.handleMouseEvent.bind(this) }
          onMouseLeave={ this.handleMouseEvent.bind(this) }
          onMouseDown={ this.handleMouseEvent.bind(this) }
          onMouseUp={ this.handleMouseEvent.bind(this) }
          onClick={ this.handleSelect.bind(this) }
          className={ classes }
          style={onlyClasses ? undefined : {...styles['Day'], ...stateStyle}}>
          { dayMoment.date() }
        </span>
        {
          showText ?
          <span
            style={{...styles['DayText']}}>
            { dayText }
          </span>
          : null
        }
      </span>
    )
  }
}

DayCell.defaultProps = {
  theme       : { 'Day' : {} },
  showText    : false,
  onlyClasses : false
}

DayCell.propTypes = {
  dayMoment   : PropTypes.object.isRequired,
  dayText     : PropTypes.string,
  showText    : PropTypes.bool,
  onSelect    : PropTypes.func,
  isSelected  : PropTypes.bool,
  isInRange   : PropTypes.bool,
  isPassive   : PropTypes.bool,
  theme       : PropTypes.shape({
    Day       : PropTypes.object.isRequired
  }).isRequired,
  onlyClasses : PropTypes.bool,
  classNames  : PropTypes.object
}

export default DayCell;

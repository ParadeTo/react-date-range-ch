import React, { Component } from 'react';
import { defaultRanges, Calendar, DateRange } from '../../../lib';
import Section from 'components/Section';

import 'normalize.css';
import 'styles/global'
import styles from 'styles/main';

export default class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      'rangePicker' : {},
      'linked' : {},
      'datePicker' : null,
      'firstDayOfWeek' : null,
      'predefined' : {},
    }
  }

  handleChange(which, payload) {
    this.setState({
      [which] : payload
    });
  }

  render() {
    const { rangePicker, linked, datePicker, firstDayOfWeek, predefined} = this.state;
    const format = 'dddd, D MMMM YYYY';

    return (
      <main className={styles['Main']}>

        <h1 className={styles['Title']}>React-date-range</h1>

        <Section title='Range Picker'>
          <div>
            <input
              type='text'
              readOnly
              value={ rangePicker['startDate'] && rangePicker['startDate'].format(format).toString() }
            />
            <input
              type='text'
              readOnly
              value={ rangePicker['endDate'] && rangePicker['endDate'].format(format).toString() }
            />
          </div>

          <DateRange
            disableDaysBefore={true}
            disableArrow={true}
            calendars={4}
            onInit={ this.handleChange.bind(this, 'rangePicker') }
            onChange={ this.handleChange.bind(this, 'rangePicker') }
          />
        </Section>

      </main>
    )
  }
}

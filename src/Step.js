/** 
 * ProboCI - ReactJS Interface
 * by Michael R. Bagnall <mrbagnall@icloud.com>
 * Twitter: @mbags17
 */

import React, { Component } from 'react';

class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusIcon: props.statusIcon,
      statusColor: props.statusColor,
      statusTask: props.statusTask,
      statusEVentName: props.statusEventName
    };
  }

  render() {
    var iconClass = this.props.statusIcon + " " + this.props.statusColor;
    return (
      <div id={ this.props.statusTask } className="left"><i title={ this.props.statusEventName } className={ iconClass } aria-hidden="true"></i></div>
    );
  }
}

export default Step;

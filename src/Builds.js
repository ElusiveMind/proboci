/** 
 * ProboCI - ReactJS Interface
 * by Michael R. Bagnall <mrbagnall@icloud.com>
 * Twitter: @mbags17
 */

import React, { Component } from 'react';
import Steps from './Steps';

class Builds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: props.steps,
      buildID: props.buildID,
      pullRequestName: props.pullRequestName,
      URL: props.URL,
      pullRequestURL: props.pullRequestURL
    };
    console.log(this.state);
  }

  tick() {
    this.setState({
      steps: this.state.steps,
      buildID: this.state.buildID,
      pullRequestName: this.state.pullRequestName,
      URL: this.state.URL,
      pullRequestURL: this.state.pullRequestURL
    });
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }
  
  componentWillUnmount() {
    //this.serverRequest.abort();
  }

  render() {
    return (
      <tr>
        <td>
          <span className="h5">{this.state.pullRequestName}</span><br />
          <p className="build-information">
            <span className="small-text-link">
              <strong>Build URL:</strong> <a className="small-text-link" href={this.state.URL}>{this.state.URL}</a><br />
              <strong>Pull Request:</strong> <a className="small-text-link" href={this.state.pullRequestURL}>{this.state.pullRequestURL}</a>
            </span>
          </p>
          <div className="build-links">
            <Steps
              steps = {this.state.steps}
              buildID = {this.state.buildID}
            />
            <div className="clear"></div>
          </div>
        </td>
        <td>
          <div className="build-details">
            <Steps
              steps = {this.state.steps}
              buildID = {this.state.buildID}
            />
            <div className="clear"></div>
          </div>
        </td>
      </tr>
    )
  }
};

export default Builds;

/** 
 * ProboCI - ReactJS Interface
 * by Michael R. Bagnall <mrbagnall@icloud.com>
 * Twitter: @mbags17
 */

// Load in our required items to run.
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Builds from './Builds';
import $ from "jquery";

// Pull in our attributes from the DOM
const attr = document.getElementById('probo-build');
var token = '$PROBO_API_TOKEN';

/** 
 * The list of builds in a specific repository.
 * 
 * @version 0.0.6
 * @author [Michael R. Bagnall](mrbagnall@icloud.com)
 */

class RepositoryBuilds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: token,
      rid: attr.getAttribute('rid'),
      url: attr.getAttribute('url'),
      builds: []
    }
    this.tick();
  }

  tick() {
    this.serverRequest = $.get(this.state.url + '/probo-api/repository-status/' + this.state.rid + '/' + this.state.token, function(result) {
      this.setState({
        builds: result.builds,
        repositoryName: result.repositoryName
      });
    }.bind(this));
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    var builds = this.state.builds;
    if (builds === undefined) {
      builds = [];
    }

    if (builds.length < 1) {
      return (
        <table className="table table-hover">
          <thead>
            <tr>
              <th colSpan="2" className="probo-purple-dark probo-text-soft-peach repository">Build Information For {this.state.repositoryName}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan="2" className="probo-no-builds">No Builds</td></tr>
          </tbody>
        </table>
      );
    } else {
      var buildsDisplay = builds.map(function(item, index) {
        return (
          <Builds
            key = {item.buildID}
            steps = {item.steps}
            buildID = {item.buildID}
            pullRequestName = {item.pullRequestName}
            URL = {item.URL}
            pullRequestURL = {item.pullRequestURL}
          />
        );
      });

      return (
        <table className="table table-hover">
          <thead>
            <tr>
              <th colSpan="2" className="probo-purple-dark probo-text-soft-peach">Build Information For {this.state.repositoryName}</th>
            </tr>
          </thead>
          <tbody>
            {buildsDisplay}
          </tbody>
        </table>
      );
    }
  }
}

/**
 * Render our main interface in the #content DOM element.
 */
ReactDOM.render(
  <RepositoryBuilds />,
  document.getElementById('repository-builds')
);

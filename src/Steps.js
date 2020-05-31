/** 
 * ProboCI - ReactJS Interface
 * by Michael R. Bagnall <mrbagnall@icloud.com>
 * Twitter: @mbags17
 */

import React, { Component } from 'react';
import Step from './Step';
import $ from "jquery";

// Pull in our attributes from the DOM
const attr = document.getElementById('probo-build');
var token = '$PROBO_API_TOKEN';

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: props.steps,
      buildID: props.buildID,
      token: token,
      url: attr.getAttribute('url')
    };
  }

  tick() {
    this.serverRequest = $.get(this.state.url + '/probo-api/specific-build-status/' + this.state.buildID+ '/' + this.state.token, function(result) {
      this.setState({
        steps: result.steps,
        ready: result.ready,
        build_url: result.url,
        build_id: result.id
      });
    }.bind(this));
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  render() {
    var steps = this.state.steps;
    var build_url = this.state.build_url;
    var build_id = this.state.build_id;

    var stepsDisplay = steps.map(function(item, index) {
      return (      
        <Step 
          key = { item.statusTask }
          statusIcon = { item.statusIcon }
          statusColor = { item.statusColor }
          statusEventName = { item.statusEventName }
        />
      );
    });

    var details_url = this.state.url + '/probo/build/' + build_id;
    var mailcatcher_url = this.state.url + '/probo/mailcatcher/' + build_id;
    var solr_url = this.state.url + '/probo/solr/' + build_id;
    var uli_url = this.state.url + '/probo/uli/' + build_id;
    var delete_url = this.state.url + '/probo/remove/' + build_id;

    return (
      <div className="right">
        <div className="right">
          { stepsDisplay }
        </div>
        <div className="clear"></div>
        <a href={uli_url} className="probo-text-purple-darkest"><i title="Admin" class="fas fa-users-cog"></i></a>
        <a href={solr_url} className="probo-text-purple-darkest"><i title="SOLR" class="fas fa-database"></i></a>
        <a href={mailcatcher_url} className="probo-text-purple-darkest"><i title="MailCatcher" className="far fa-envelope"></i></a>
        <a href={build_url} className="probo-text-purple-darkest"><i title="View Build" className="far fa-eye"></i></a>
        <a href={details_url} className="probo-text-purple-darkest"><i title="Build Details" className="fas fa-info-circle"></i></a>
        <a href={delete_url} className="probo-text-purple-darkest"><i title="Delete Build" className="fas fa-times"></i></a>
      </div>
    );
  }
}

export default Steps;

import React, { Component } from 'react';
import UserMapContainer from './UserMapContainer';
import UpFrontForm from '../../upFrontButtonForm';
import * as global from '../../global';
import '../../App.css';

export default class UserMap extends Component {
  state = {
    patientId: 'user',
    demoOrReal: '',
    inputOrCheck: 'check',

    initialCenter: { lat: 43.6532, lng: -79.3832 },
    initialLat: 43.6532,
    initialLon: -79.3832,
  };

  handlePatientIdSubmit = (patientId, demoOrReal, inputOrCheck) => {
    this.setState({ patientId, demoOrReal, inputOrCheck });
  };

  handleCheckFootprintSubmit = (patientId, demoOrReal, inputOrCheck) => {
    this.setState({ patientId, demoOrReal, inputOrCheck });
  };

  renderMapOrForm = () => {
    if (this.state.patientId === '') {
      return (
        <UpFrontForm
          handlePatientIdSubmit={this.handlePatientIdSubmit}
          title={'Welcome to the GeoTimeline Application'}
          description={`Click 'Start Demo Timeline' to try out the application. Click 'Start Real Timeline' to record your footprint history if you have been confirmed to have Covid19 Coronavirus.`}
        />
      );
    } else {
      return (
        <UserMapContainer
          patientId={this.state.patientId}
          apiKey={global.API_KEY}
          initialLat={this.state.initialLat}
          initialLon={this.state.initialLon}
          demoOrReal={this.state.demoOrReal}
          inputOrCheck={this.state.inputOrCheck}
        />
      );
    }
  };

  handleBrowserGeo = () => {
    if (!navigator.geolocation) {
      console.log('no browser geo');
    } else {
      navigator.geolocation.getCurrentPosition((success, error) => {
        if (error) {
          this.setState({
            initialCenter: { lat: 43.6532, initialCenterLon: -79.3832 },
          });
        } else {
          console.log(success.coords.latitude);
          this.setState({
            initialLat: success.coords.latitude,
            initialLon: success.coords.longitude,
          });
        }
      });
    }
  };

  componentDidMount() {
    this.handleBrowserGeo();
  }

  render() {
    return this.renderMapOrForm();
  }
}

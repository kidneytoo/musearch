import React, { Component } from 'react';
import axios from 'axios';
import Results from '../blocks/Results';
import GigCard from '../blocks/GigCard';
import { connect } from 'react-redux';
import PostRegisterModal from './PostRegisterModal';
import { Button } from 'antd';

class ArtistPage extends Component {
  state = {
    artistInfo: null,
    registerVisible: false
  };

  showModal = () => {
    this.setState({
      registerVisible: true
    });
  };

  handleCancel = e => {
    this.setState({
      registerVisible: false
    });
  };

  getArtistInfo = () => {
    const url = this.props.match.params.url;
    return axios.get(`http://localhost:5000/api/artist/${url}`).then(res => {
      this.setState({
        artistInfo: res.data
      });
    });
  };

  componentDidMount = () => {
    this.getArtistInfo();
  };

  render() {
    if (!this.state.artistInfo) return <div />;
    return (
      <div className="artist-page-container">
        <PostRegisterModal
          modalVisible={this.state.registerVisible}
          onCancel={this.handleCancel.bind(this)}
          id={this.state.artistInfo._id}
        />
        <h3>{this.state.artistInfo.name}</h3>
        <div className="content-box">
          <p className="topic">Description</p>
          <p className="desc">{this.state.artistInfo.description}</p>
        </div>
        <div className="content-box">
          <p className="topic">Members</p>
          <table className="member-table">
            {this.state.artistInfo.members.map((data, idx) => {
              return (
                <tr>
                  <td>{data.play}</td>
                  <td> - </td>
                  <td>
                    {data.name} ({data.nickname})
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="youtube-container">
          <h4>Example</h4>
          <div>
            {this.state.artistInfo.youtubeLink.map((data, idx) => {
              let video_id = data.split('v=')[1];
              let ampersandPosition = video_id.indexOf('&');
              if (ampersandPosition != -1) {
                video_id = video_id.substring(0, ampersandPosition);
              }
              return <Results key={idx} videoId={video_id} />;
            })}
          </div>
        </div>
        <h3> Gigs</h3>
        <div className="gigs-container" />
        {this.state.artistInfo.work.map((data, idx) => {
          return <GigCard key={idx} data={data} />;
        })}
        {this.props.auth &&
        this.props.auth._id === this.state.artistInfo.owner ? (
          <Button onClick={this.showModal}>Add Gigs</Button>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(ArtistPage);

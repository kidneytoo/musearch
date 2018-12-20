import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';

class ArtistRegisterPage extends Component {
  state = {
    isAdd: false,
    name: '',
    members: [{ name: '', nickname: '', play: '' }],
    description: '',
    youtubeLink: [''],
    url: ''
  };
  nameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleMemberNameChange = idx => e => {
    const newMembers = this.state.members.map((data, sidx) => {
      if (idx !== sidx) return data;
      return { ...data, name: e.target.value };
    });
    this.setState({
      members: newMembers
    });
  };

  handleMemberNickNameChange = idx => e => {
    const newMembers = this.state.members.map((data, sidx) => {
      if (idx !== sidx) return data;
      return { ...data, nickname: e.target.value };
    });

    this.setState({
      members: newMembers
    });
  };

  handleMemberPlayChange = idx => e => {
    const newMembers = this.state.members.map((data, sidx) => {
      if (idx !== sidx) return data;
      return { ...data, play: e.target.value };
    });

    this.setState({
      members: newMembers
    });
  };

  handleAddMember = () => {
    this.setState({
      members: this.state.members.concat([{ name: '', nickname: '', play: '' }])
    });
  };

  handleRemoveMember = idx => {
    this.setState({
      members: this.state.members.filter((s, sidx) => idx !== sidx)
    });
  };

  descriptionChange = e => {
    this.setState({
      description: e.target.value
    });
  };

  handleYoutubeLinkChange = idx => e => {
    const newYoutube = this.state.youtubeLink.map((data, sidx) => {
      if (idx !== sidx) return data;
      return e.target.value;
    });
    this.setState({
      youtubeLink: newYoutube
    });
  };

  handleAddYoutubeLink = () => {
    this.setState({
      youtubeLink: this.state.members.concat([''])
    });
  };

  handleRemoveYoutubeLink = idx => {
    this.setState({
      youtubeLink: this.state.youtubeLink.filter((s, sidx) => idx !== sidx)
    });
  };

  urlChange = e => {
    this.setState({
      url: e.target.value
    });
  };

  handleSubmit = () => {
    let addArtist = axios.post('http://localhost:5000/api/artist', {
      ownerId: this.props.auth._id,
      name: this.state.name,
      genre: [],
      members: this.state.members,
      description: this.state.description,
      youtubeLink: this.state.youtubeLink,
      url: this.state.url
    });
    addArtist.then(res => {
      this.setState({ isAdd: true });
    });
  };
  render() {
    if (this.state.isAdd) return <Redirect to="/amProfile" />;
    return (
      <div>
        <h3>Add Artist</h3>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.name} onChange={this.nameChange} />
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Nickname</th>
                <th>Play</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.members.map((data, idx) => {
                return (
                  <tr>
                    <td>
                      <input
                        onChange={this.handleMemberNameChange(idx)}
                        value={data.name}
                      />
                    </td>
                    <td>
                      <input
                        onChange={this.handleMemberNickNameChange(idx)}
                        value={data.nickname}
                      />
                    </td>
                    <td>
                      <input
                        onChange={this.handleMemberPlayChange(idx)}
                        value={data.play}
                      />
                    </td>
                    <td>
                      <Button onClick={() => this.handleRemoveMember(idx)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Button onClick={() => this.handleAddMember()}>Add Member</Button>
          <input
            value={this.state.description}
            onChange={this.descriptionChange}
          />
          {this.state.youtubeLink.map((data, idx) => {
            return (
              <div key={idx}>
                <input
                  value={this.state.youtubeLink}
                  onChange={this.handleYoutubeLinkChange(idx)}
                />
                <Button onClick={() => this.handleRemoveYoutubeLink(idx)}>
                  Delete
                </Button>
              </div>
            );
          })}
          <Button onClick={() => this.handleAddYoutubeLink()}>
            Add Youtube Link
          </Button>
          <input value={this.state.url} onChange={this.urlChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(
  mapStateToProps,
  null
)(ArtistRegisterPage);

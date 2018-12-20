import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Button, Modal, DatePicker, Input, InputNumber } from 'antd';

class PostRegisterModal extends Component {
  state = {
    topic: '',
    description: '',
    date: null,
    cost: Number(0),
    method: '',
    link: '',
    isAddPost: false
  };

  topicChange = e => {
    this.setState({
      topic: e.target.value
    });
  };

  descriptionChange = e => {
    this.setState({
      description: e.target.value
    });
  };

  dateChange = (date, dateString) => {
    this.setState({
      date: date
    });
  };

  costChange = value => {
    this.setState({
      cost: value
    });
  };

  methodChange = e => {
    this.setState({
      method: e.target.value
    });
  };

  linkChange = e => {
    this.setState({
      link: e.target.value
    });
  };

  handleSubmit = () => {
    let addPost = axios.post('http://localhost:5000/api/post', {
      artistID: this.props.id,
      topic: this.state.topic,
      description: this.state.description,
      date: null,
      cost: [this.state.cost],
      method: this.state.method,
      link: this.state.link
    });
    addPost.then(
      this.setState({
        isAddPost: true
      })
    );
  };

  render() {
    if (this.state.isAddPost) return <Redirect to={`/`} />;
    return (
      <Modal
        visible={this.props.modalVisible}
        onCancel={this.props.onCancel}
        footer={null}
      >
        <div>
          <form onSubmit={() => this.handleSubmit()}>
            <Input value={this.state.topic} onChange={this.topicChange} />
            <Input
              value={this.state.description}
              onChange={this.descriptionChange}
            />
            <DatePicker onChange={this.dateChange} value={this.state.date} />
            <InputNumber value={this.state.cost} onChange={this.costChange} />
            <Input value={this.state.method} onChange={this.methodChange} />
            <Input value={this.state.link} onChange={this.linkChange} />
            <Button htmlType="submit">Add Gigs</Button>
          </form>
        </div>
      </Modal>
    );
  }
}

export default PostRegisterModal;

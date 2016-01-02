import React from 'react';
import Repos from './Github/Repos';
import Notes from './Notes/Notes';
import UserProfile from './Github/UserProfile';
import getGithubInfo from '../utils/helpers';
import Rebase from 're-base';

const base = Rebase.createClass('https://gg-react-notetaker.firebaseio.com/');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      bio: {},
      repos: []
    };
  }

  componentDidMount() {
    this.ref = new Firebase('https://gg-react-notetaker.firebaseio.com/');
    this.init(this.props.params.username);
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  componentWillReceiveProps(nextProps) {
    base.removeBinding(this.ref);
    this.init(nextProps.params.username);
  }
  init(username) {
    this.ref = base.bindToState(this.props.params.username, {
      context: this,
      asArray: true,
      state: 'notes'
    });

    getGithubInfo(username)
      .then(function(data) {
        this.setState({
          bio: data.bio,
          repos: data.repos
        });
      }.bind(this));
  }
  handleAddNote(newNote) {
    base.post(this.props.params.username, {
      data: this.states.notes.concat([newNote])
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos}/>
        </div>
        <div className="col-md-4">
          <Notes username={this.props.params.username}
                 notes={this.state.notes}
                 addNote={(newNote)=> this.handleAddNote(newNote)} />
        </div>
      </div>
    );
  }
}

export default Profile;

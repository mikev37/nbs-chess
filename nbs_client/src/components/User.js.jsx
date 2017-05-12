var React = require('react');
import cookie from 'react-cookie';
import FacebookProvider, { Like } from 'react-facebook';
import GameList from './GameList.js.jsx';

var User = React.createClass({

  render() {
    const usr_obj = cookie.load('userId');
    const user_name = usr_obj.email;
    return (
      <div className="row">
            <div className = "col-md-3 col-md-push-1">
            <h2>Email:{user_name}</h2>
            <button className="btn btn-warning btn-block">Change Password</button>
            <button className="btn btn-success btn-block">Add Phone Number</button>
            <button className="btn btn-danger btn-block">Add Google Account</button>
            <button className="btn btn-basic btn-block">Add Steam Name</button>
            <button className="btn btn-primary btn-block">Add Facebook Account</button>
            <button className="btn btn-info btn-block">Add Twitter Handle</button>
            <FacebookProvider appId="123456789">
              <Like href="http://www.facebook.com" colorScheme="dark" showFaces share />
            </FacebookProvider>
            </div>
            <GameList usr={usr_obj} in_list={usr_obj.games}/>
      </div>
    );
  }
});

export default User;

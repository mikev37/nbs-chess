var React = require('react');

var User = React.createClass({
  
  
  
  
  render() {
    const user_name = this.props.user;
    return (
      <div>
            <h2>{user_name}</h2>
              <div className="fb-like" 
                data-href="http://www.your-domain.com/your-page.html" 
                data-layout="standard" 
                data-action="like" 
                data-show-faces="true">
              </div>
            <div>
            </div>
      </div>
    );
  }
});

export default User;

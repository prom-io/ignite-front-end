import React from "react";


class UserComponent extends React.Component {
  constructor(props) {
    super(props)
    this.isLogin = props.isLogin
    this.src = props.src || '/default_user.png'
    this.username = props.username || 'Username'
    this.addres = props.addres || `0x93E0b9BE0637D1aEf\n3440D8eA94ee52E8F935bE9`
    this.posts = props.posts || 0
    this.followers = props.followers || 0
    this.follow = props.follow || 0

  }
  render () {
    if (this.isLogin) {
      return (
        <div className="user-profile-card">
          <div className="user-card-top user-card-content-box">
            <img src={this.src} alt=""/>
          </div>
          <div className="user-card-bottom user-card-content-box">
            <div className="user-card-username">
            <h4>{this.username}</h4>
            <p>{this.addres}</p>
            </div>
            <div className="user-card-statistic">
              <div>
                <p>{this.posts}</p>
                <h5>Posts</h5>
              </div>
              <div>
                <p>{this.followers}</p>
                <h5>Followers</h5>
              </div>
              <div>
                <p>{this.follow}</p>
                <h5>Follow</h5>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="user-profile-card">
          <div className="user-card-notauth-box">
            <div className="user-card-notauth">
              <img src="/user-card-search.png" alt=""/>
              <p>Follow your interests.</p>
            </div>
            <div className="user-card-notauth">
              <img src="/user-card-friend.png" alt=""/>
              <p>Hear what people talking about</p>
            </div>
            <div className="user-card-notauth">
              <img src="/user-card-search.png" alt=""/>
              <p>Join the conversation</p>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default UserComponent;
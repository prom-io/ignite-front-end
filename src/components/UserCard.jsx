import React from "react";
import {inject, observer} from "mobx-react";

const lineBreak = (param) => (param.slice(0, 21) + " " + param.slice(21))

@inject(({userCard}) => ({
  isLogin: Boolean(userCard.user),
  src: userCard.user && userCard.user.avatar,
  username: userCard.user && userCard.user.username,
  address: userCard.user && userCard.user.username,
  followers: userCard.user && userCard.user.followers_count,
  posts: userCard.user && userCard.user.statuses_count,
  follow: userCard.user && userCard.user.follows_count
}))
@observer
class UserComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const {isLogin, src, username, address, posts, followers, follow} = this.props;

    if (isLogin) {
      return (
        <div className="user-profile-card">
          <div className="user-card-top user-card-content-box">
            <img src={src} alt=""/>
          </div>
          <div className="user-card-bottom user-card-content-box">
            <div className="user-card-username">
              <h4>{lineBreak(username)}</h4>
              <p>{lineBreak(address) }</p>
            </div>
            <div className="user-card-statistic">
              <div>
                <p>{posts}</p>
                <h5>Posts</h5>
              </div>
              <div>
                <p>{followers}</p>
                <h5>Followers</h5>
              </div>
              <div>
                <p>{follow}</p>
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

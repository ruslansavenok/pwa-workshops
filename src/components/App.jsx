import React, { Fragment, Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import classnames from 'classnames';
import List from './List';
import EmptyPage from './EmptyPage';
import TabBar from './TabBar';
import ItemShow from './ItemShow';

class App extends Component {
  state = {
    wines: [],
    isOffline: false
  };

  componentDidMount() {
    window.addEventListener('online', this.updateStatus);
    window.addEventListener('offline', this.updateStatus);
    this.updateStatus();
    this.getData();
  }

  updateStatus = () => {
    this.setState({ isOffline: !navigator.onLine });
  };

  getData = () => {
    fetch('https://api-wine.herokuapp.com/api/v1/wines')
      .then(res => res.json())
      .then(data => {
        this.setState({ wines: data });
      })

  };

  renderContent() {
    if (!this.state.wines.length) {
      return <div />;
    }

    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={() => <List items={this.state.wines} />} />
          <Route path="/wine/:id" component={() => <ItemShow items={this.state.wines} />} />
          <Route path="/wishlist" component={EmptyPage} />
          <Route path="/cellar" component={EmptyPage} />
          <Route path="/articles" component={EmptyPage} />
          <Route path="/profile" component={EmptyPage} />
        </Switch>
        <TabBar />
      </Fragment>
    );
  }

  render() {
    return (
      <Router>
        <Fragment>
          <div className={classnames('offline-status', {
            'offline-status--visible': this.state.isOffline
          })}>
            You're offline bro :(
          </div>
          {this.renderContent()}
        </Fragment>
      </Router>
    );
  }
}

export default App;

import React, { Fragment, Component } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
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

  componentWillUnmount() {
    window.removeEventListener('online', this.updateStatus);
    window.removeEventListener('offline', this.updateStatus);
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

  renderContent(location) {
    if (!this.state.wines.length) {
      return <div />;
    }

    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={200}
          >
            <Switch location={location}>
              <Route exact path="/" component={() => <List items={this.state.wines} />} />
              <Route path="/wine/:id" component={() => <ItemShow items={this.state.wines} />} />
              <Route path="/wishlist" component={EmptyPage} />
              <Route path="/cellar" component={EmptyPage} />
              <Route path="/articles" component={EmptyPage} />
              <Route path="/profile" component={EmptyPage} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <TabBar />
      </Fragment>
    );
  }

  render() {
    return (
      <Router>
        <Route
          render={({ location }) => (
            <Fragment>
              <div className={classnames('offline-status', {
                'offline-status--visible': this.state.isOffline
              })}>
                You're offline bro :(
              </div>
              {this.renderContent(location)}
            </Fragment>
          )}
        />
      </Router>
    );
  }
}

export default App;

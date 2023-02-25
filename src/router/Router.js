import { Spinner } from 'grommet';
import React from 'react';
import { Redirect, Route, Switch } from 'wouter';

import HorizontalCenter from '../shared/react/HorizontalCenter';
import Account from '../views/Account';
import ChangePassword from '../views/ChangePassword';
import Contact from '../views/Contact';
import Encryption from '../views/Encryption';
import HowItWorks from '../views/HowItWorks';
import HowToFindSelector from '../views/HowToFindSelector';
import IntegrateTelegram from '../views/IntegrateTelegram';
import IntegrateTelegramChannel from '../views/IntegrateTelegramChannel';
import Limitations from '../views/Limitations';
import Motivation from '../views/Motivation';
import Pricing from '../views/Pricing';
import Privacy from '../views/Privacy';
import Security from '../views/Security';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import Terms from '../views/Terms';
import Tickets from '../views/Tickets';
import WatcherAdd from '../views/WatcherAdd';
import WatcherDetails from '../views/WatcherDetails';
import WatcherEdit from '../views/WatcherEdit';
import Watchers from '../views/Watchers';
import Welcome from '../views/Welcome';

function Router({ isCheckingRefreshToken, isLoggedIn }) {
  if (isCheckingRefreshToken) {
    return (
      <HorizontalCenter justify="center" margin="3rem 0 0">
        <Spinner size="large" />
      </HorizontalCenter>
    );
  }

  if (isLoggedIn) {
    return (
      <Switch>
        <Route path="/account" component={Account} />
        <Route path="/account/telegram" component={IntegrateTelegram} />
        <Route path="/security" component={Security} />
        <Route path="/security/password" component={ChangePassword} />
        <Route path="/w/add" component={WatcherAdd} />
        <Route path="/w/:id" component={WatcherDetails} />
        <Route path="/w/:id/edit" component={WatcherEdit} />
        <Route path="/w/:id/telegram" component={IntegrateTelegramChannel} />

        <Route path="/selector" component={HowToFindSelector} />
        <Route path="/limitations" component={Limitations} />
        <Route path="/how" component={HowItWorks} />
        <Route path="/encryption" component={Encryption} />
        <Route path="/tickets" component={Tickets} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/motivation" component={Motivation} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/contact" component={Contact} />

        <Route path="/" component={Watchers} />
        <Route>{() => <Redirect to="/" />}</Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/w/:id" component={WatcherDetails} />

      <Route path="/selector" component={HowToFindSelector} />
      <Route path="/limitations" component={Limitations} />
      <Route path="/how" component={HowItWorks} />
      <Route path="/encryption" component={Encryption} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/motivation" component={Motivation} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/contact" component={Contact} />

      <Route path="/" component={Welcome} />
      <Route>{() => <Redirect to="/" />}</Route>
    </Switch>
  );
}

export default Router;

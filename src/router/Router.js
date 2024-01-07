import { Spinner } from 'grommet';
import React from 'react';
import { Redirect, Route, Switch } from 'wouter';
import HorizontalCenter from '../shared/react-pure/HorizontalCenter';
import ChangePassword from '../shared/react/ChangePassword';
import Security from '../shared/react/Security';
import Setup2FA from '../shared/react/Setup2FA';
import SignIn from '../shared/react/SignIn';
import SignUp from '../shared/react/SignUp';
import Verify2FA from '../shared/react/Verify2FA';
import Account from '../views/Account';
import IntegrateTelegram from '../views/IntegrateTelegram';
import IntegrateTelegramChannel from '../views/IntegrateTelegramChannel';
import Pricing from '../views/Pricing';
import Tickets from '../views/Tickets';
import WatcherAdd from '../views/WatcherAdd';
import WatcherDetails from '../views/WatcherDetails';
import WatcherEdit from '../views/WatcherEdit';
import Watchers from '../views/Watchers';
import Welcome from '../views/Welcome';

function Router({ isCheckingRefreshToken, isLoggedIn, isLoadingSettings, isExpired }) {
  if (isCheckingRefreshToken || isLoadingSettings) {
    return (
      <HorizontalCenter justify="center" margin="3rem 0 0">
        <Spinner size="large" />
      </HorizontalCenter>
    );
  }

  if (isLoggedIn) {
    if (isExpired) {
      return (
        <Switch>
          <Route path="/" component={Tickets} />
          <Route>{() => <Redirect to="/" />}</Route>
        </Switch>
      );
    }

    return (
      <Switch>
        <Route path="/account" component={Account} />
        <Route path="/account/telegram" component={IntegrateTelegram} />
        <Route path="/security" component={Security} />
        <Route path="/security/2fa" component={Setup2FA} />
        <Route path="/security/password" component={ChangePassword} />
        <Route path="/w/add" component={WatcherAdd} />
        <Route path="/w/:id" component={WatcherDetails} />
        <Route path="/w/:id/edit" component={WatcherEdit} />
        <Route path="/w/:id/telegram" component={IntegrateTelegramChannel} />

        <Route path="/tickets" component={Tickets} />
        <Route path="/pricing" component={Pricing} />

        <Route path="/" component={Watchers} />
        <Route>{() => <Redirect to="/" />}</Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-in/2fa" component={Verify2FA} />
      <Route path="/w/:id" component={WatcherDetails} />

      <Route path="/pricing" component={Pricing} />

      <Route path="/" component={Welcome} />
      <Route>{() => <Redirect to="/" />}</Route>
    </Switch>
  );
}

export default Router;

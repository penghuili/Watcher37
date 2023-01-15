import { Box, Spinner } from 'grommet';
import React from 'react';
import { Redirect, Route, Switch } from 'wouter';

import Account from '../views/Account';
import ChangePassword from '../views/ChangePassword';
import IntegrateTelegram from '../views/IntegrateTelegram';
import IntegrateTelegramChannel from '../views/IntegrateTelegramChannel';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import WatcherAdd from '../views/WatcherAdd';
import WatcherDetails from '../views/WatcherDetails';
import WatcherEdit from '../views/WatcherEdit';
import Watchers from '../views/Watchers';
import Welcome from '../views/Welcome';

function Router({ isCheckingRefreshToken, isLoggedIn }) {
  if (isCheckingRefreshToken) {
    return (
      <Box align="center" justify="center" margin="3rem 0 0">
        <Spinner size="large" />
      </Box>
    );
  }

  if (isLoggedIn) {
    return (
      <Switch>
        <Route path="/account" component={Account} />
        <Route path="/account/telegram" component={IntegrateTelegram} />
        <Route path="/account/password" component={ChangePassword} />
        <Route path="/watchers/add" component={WatcherAdd} />
        <Route path="/watchers/:id" component={WatcherDetails} />
        <Route path="/watchers/:id/edit" component={WatcherEdit} />
        <Route path="/watchers/:id/telegram" component={IntegrateTelegramChannel} />
        <Route path="/" component={Watchers} />
        <Route>{() => <Redirect to="/" />}</Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/" component={Welcome} />
      <Route>{() => <Redirect to="/" />}</Route>
    </Switch>
  );
}

export default Router;

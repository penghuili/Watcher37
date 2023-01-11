import { connect } from 'react-redux';
import { accountActionCreators } from '../../store/account/accountActions';

import { appActionCreators } from '../../store/app/appActions';
import { authSelectors } from '../../store/auth/authSelectors';
import AppBar from './AppBar';

const mapStateToProps = state => ({
  isLoggedIn: authSelectors.isLoggedIn(state),
});

const mapDispatchToProps = {
  onBack: appActionCreators.goBack,
  onNavToAccount: accountActionCreators.navToAccountPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);

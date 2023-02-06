import { connect } from 'react-redux';

import { accountSelectors } from '../../store/account/accountSelectors';
import { appActionCreators } from '../../store/app/appActions';
import { authSelectors } from '../../store/auth/authSelectors';
import ExpiredTag from './ExpiredTag';

const mapStateToProps = state => ({
  isLoggedIn: authSelectors.isLoggedIn(state),
  isAccountValid: accountSelectors.isAccountValid(state),
  expiresAt: accountSelectors.getExpiresAt(state),
});

const mapDispatchToProps = {
  onBack: appActionCreators.goBack,
  onNav: appActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpiredTag);

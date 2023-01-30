import { connect } from 'react-redux';

import { accountActionCreators } from '../../store/account/accountActions';
import { accountSelectors } from '../../store/account/accountSelectors';
import { appActionCreators } from '../../store/app/appActions';
import { authActionCreators } from '../../store/auth/authActions';
import Account from './Account';

const mapStateToProps = state => ({
  account: accountSelectors.getAccount(state),
  expiresAt: accountSelectors.getExpiresAt(state),
  isLoadingAccount: accountSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onNavigate: appActionCreators.navigate,
  onLogOut: authActionCreators.logOutPressed,
  onDelete: accountActionCreators.deletePressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);

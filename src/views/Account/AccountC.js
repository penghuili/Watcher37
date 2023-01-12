import { connect } from 'react-redux';

import { accountActionCreators } from '../../store/account/accountActions';
import { accountSelectors } from '../../store/account/accountSelectors';
import { authActionCreators } from '../../store/auth/authActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import Account from './Account';

const mapStateToProps = state => ({
  account: accountSelectors.getAccount(state),
  isLoadingAccount: accountSelectors.isLoading(state),
  pageContent: watcherSelectors.getContent(state),
});

const mapDispatchToProps = {
  onLogOut: authActionCreators.logOutPressed,
  onDelete: accountActionCreators.deletePressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);

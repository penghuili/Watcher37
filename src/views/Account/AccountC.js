import { connect } from 'react-redux';
import { accountActionCreators } from '../../store/account/accountActions';

import { accountSelectors } from '../../store/account/accountSelectors';
import { authActionCreators } from '../../store/auth/authActions';
import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import Account from './Account';

const mapStateToProps = state => ({
  account: accountSelectors.getAccount(state),
  isLoadingAccount: accountSelectors.isLoading(state),
  pageContent: watcherSelectors.getContent(state),
});

const mapDispatchToProps = {
  onEnter: accountActionCreators.viewEntered,
  onLogOut: authActionCreators.logOutPressed,
  onDelete: accountActionCreators.deletePressed,
  onFetchContent: watcherActionCreators.fetchContentPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);

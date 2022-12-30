import { connect } from 'react-redux';
import { accountActionCreators } from '../../store/account/accountActions';

import { accountSelectors } from '../../store/account/accountSelectors';
import { authActionCreators } from '../../store/auth/authActions';
import Home from './Home';

const mapStateToProps = state => ({
  account: accountSelectors.getAccount(state),
  isLoadingAccount: accountSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onEnter: accountActionCreators.viewEntered,
  onLogOut: authActionCreators.logOutPressed,
  onDelete: accountActionCreators.deletePressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

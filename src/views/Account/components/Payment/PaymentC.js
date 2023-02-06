import { connect } from 'react-redux';
import { accountActionCreators } from '../../../../store/account/accountActions';

import { accountSelectors } from '../../../../store/account/accountSelectors';
import { appActionCreators } from '../../../../store/app/appActions';
import Payment from './Payment';

const mapStateToProps = state => ({
  expiresAt: accountSelectors.getExpiresAt(state),
  tried: accountSelectors.tried(state),
  isAccountValid: accountSelectors.isAccountValid(state),
  isLoading: accountSelectors.isLoadingSettings(state),
});

const mapDispatchToProps = {
  onTry: accountActionCreators.tryPressed,
  onNavigate: appActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

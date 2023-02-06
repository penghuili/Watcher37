import { connect } from 'react-redux';

import { accountActionCreators } from '../../store/account/accountActions';
import { accountSelectors } from '../../store/account/accountSelectors';
import Tickets from './Tickets';

const mapStateToProps = state => ({
  expiresAt: accountSelectors.getExpiresAt(state),
  payError: accountSelectors.getPayError(state),
  isAccountValid: accountSelectors.isAccountValid(state),
  isLoading: accountSelectors.isLoadingSettings(state),
});

const mapDispatchToProps = {
  onPay: accountActionCreators.payPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);

import { connect } from 'react-redux';
import { accountActionCreators } from '../../../../store/account/accountActions';

import { accountSelectors } from '../../../../store/account/accountSelectors';
import Payment from './Payment';

const mapStateToProps = state => ({
  expiresAt: accountSelectors.getExpiresAt(state),
  tried: accountSelectors.tried(state),
  isLoading: accountSelectors.isLoadingSettings(state),
});

const mapDispatchToProps = {
  onTry: accountActionCreators.tryPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

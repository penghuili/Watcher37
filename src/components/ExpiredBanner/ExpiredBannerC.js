import { connect } from 'react-redux';

import { accountSelectors } from '../../store/account/accountSelectors';
import { appActionCreators } from '../../store/app/appActions';
import ExpiredBanner from './ExpiredBanner';

const mapStateToProps = state => ({
  isExpired: !accountSelectors.isAccountValid(state) && !!accountSelectors.getExpiresAt(state),
});

const mapDispatchToProps = {
  onNav: appActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpiredBanner);

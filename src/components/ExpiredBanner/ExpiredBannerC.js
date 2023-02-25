import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import ExpiredBanner from './ExpiredBanner';

const mapStateToProps = state => ({
  isExpired: !watcherSelectors.isAccountValid(state) && !!watcherSelectors.getExpiresAt(state),
});

const mapDispatchToProps = {
  onNav: sharedActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpiredBanner);

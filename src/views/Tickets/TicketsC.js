import { connect } from 'react-redux';

import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import Tickets from './Tickets';

const mapStateToProps = state => ({
  payError: watcherSelectors.getPayError(state),
  isLoading: watcherSelectors.isLoadingSettings(state),
});

const mapDispatchToProps = {
  onPay: watcherActionCreators.payPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);

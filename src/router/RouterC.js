import { connect } from 'react-redux';
import sharedSelectors from '../shared/react/store/sharedSelectors';
import Router from './Router';

const mapStateToProps = state => ({
  isCheckingRefreshToken: sharedSelectors.isCheckingRefreshToken(state),
  isLoggedIn: sharedSelectors.isLoggedIn(state),
  isLoadingSettings: sharedSelectors.isLoadingSettings(state),
  isExpired: !sharedSelectors.isAccountValid(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Router);

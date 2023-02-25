import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import sharedSelectors from '../../shared/react/store/sharedSelectors';
import SignUp from './SignUp';

const mapStateToProps = state => ({
  errorMessage: sharedSelectors.getErrorMessage(state),
  isLoading: sharedSelectors.isLoadingAuth(state),
});

const mapDispatchToProps = {
  onSignUp: sharedActionCreators.signUpPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

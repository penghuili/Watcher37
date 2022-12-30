import { connect } from 'react-redux';
import { authActionCreators } from '../../store/auth/authActions';

import Welcome from './Welcome';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onSignUp: authActionCreators.signUpPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

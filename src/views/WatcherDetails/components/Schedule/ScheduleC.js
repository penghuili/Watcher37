import { connect } from 'react-redux';

import { watcherActionCreators } from '../../../../store/watcher/watcherActions';
import Schedule from './Schedule';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onDeleteSchedule: watcherActionCreators.deleteTriggerPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

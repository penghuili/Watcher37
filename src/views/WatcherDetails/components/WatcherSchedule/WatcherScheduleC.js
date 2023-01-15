import { connect } from 'react-redux';

import { watcherActionCreators } from '../../../../store/watcher/watcherActions';
import WatcherSchedule from './WatcherSchedule';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onDeleteSchedule: watcherActionCreators.deleteTriggerPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatcherSchedule);

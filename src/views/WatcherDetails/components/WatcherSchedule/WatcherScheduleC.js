import { connect } from 'react-redux';

import { watcherActionCreators } from '../../../../store/watcher/watcherActions';
import { watcherSelectors } from '../../../../store/watcher/watcherSelectors';
import WatcherSchedule from './WatcherSchedule';

const mapStateToProps = state => ({
  isEditingSchedule: watcherSelectors.isEditingSchedule(state),
});

const mapDispatchToProps = {
  onEdit: () => watcherActionCreators.isEditingSchedule(true),
  onDeleteSchedule: watcherActionCreators.deleteTriggerPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatcherSchedule);

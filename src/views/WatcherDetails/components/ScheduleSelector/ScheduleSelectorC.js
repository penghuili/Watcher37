import { connect } from 'react-redux';

import { watcherActionCreators } from '../../../../store/watcher/watcherActions';
import { watcherSelectors } from '../../../../store/watcher/watcherSelectors';
import ScheduleSelector from './ScheduleSelector';

const mapStateToProps = state => ({
  isLoading: watcherSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onSchedule: watcherActionCreators.scheduleTriggerPressed,
  onCancel: () => watcherActionCreators.isEditingSchedule(false),
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSelector);

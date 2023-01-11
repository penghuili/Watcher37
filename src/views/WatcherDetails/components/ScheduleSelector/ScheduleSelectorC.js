import { connect } from 'react-redux';

import { watcherActionCreators } from '../../../../store/watcher/watcherActions';
import ScheduleSelector from './ScheduleSelector';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onSchedule: watcherActionCreators.scheduleTriggerPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSelector);

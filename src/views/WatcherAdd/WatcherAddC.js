import { connect } from 'react-redux';

import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import WatcherAdd from './WatcherAdd';

const mapStateToProps = state => ({
  content: watcherSelectors.getContent(state),
  contentLink: watcherSelectors.getContentLink(state),
  isLoading: watcherSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetchContent: watcherActionCreators.fetchContentPressed,
  onCreate: watcherActionCreators.createPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatcherAdd);

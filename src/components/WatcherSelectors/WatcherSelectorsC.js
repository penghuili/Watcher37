import { connect } from 'react-redux';

import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import WatcherSelectors from './WatcherSelectors';

const mapStateToProps = state => ({
  content: watcherSelectors.getContent(state),
  contentLink: watcherSelectors.getContentLink(state),
  contentError: watcherSelectors.getContentError(state),
  isLoading: watcherSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetchContent: watcherActionCreators.fetchContentPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatcherSelectors);

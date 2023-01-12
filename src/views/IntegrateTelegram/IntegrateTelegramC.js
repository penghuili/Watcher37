import { connect } from 'react-redux';

import { accountActionCreators } from '../../store/account/accountActions';
import { accountSelectors } from '../../store/account/accountSelectors';
import IntegrateTelegram from './IntegrateTelegram';

const mapStateToProps = state => ({
  telegramId: accountSelectors.getAccount(state).telegramId,
  isLoading: accountSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onAddTelegramId: accountActionCreators.addTelegramIdPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntegrateTelegram);

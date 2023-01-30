import { Anchor, Box, Heading, Menu, Spinner, Text } from 'grommet';
import { FormView, FormViewHide, Insecure, MoreVertical, Secure } from 'grommet-icons';
import React, { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import HorizontalCenter from '../../components/HorizontalCenter';
import Modal from '../../components/Modal';
import { formatDateTime } from '../../lib/date';
import WatcherHistory from './components/WatcherHistory';
import WatcherSchedule from './components/WatcherSchedule';
import WatcherTelegram from './components/WatcherTelegram';

function WatcherDetails({
  params: { id },
  watcher,
  isOwner,
  fetchError,
  isLoading,
  onFetchWatcher,
  onDelete,
  onNavToEdit,
  onEncrypt,
  onDecrypt,
  onPublic,
  onPrivate,
}) {
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    onFetchWatcher(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar title="Watcher details" hasBack />
      <ContentWrapper>
        {isLoading && <Spinner />}
        {!!fetchError && <Text size="large">{fetchError}</Text>}
        {!!watcher && (
          <>
            <HorizontalCenter>
              <Heading level="3" margin="0">
                {watcher.title}
              </Heading>
              {isOwner && (
                <Menu
                  icon={<MoreVertical />}
                  items={[
                    {
                      label: 'Edit',
                      onClick: () => onNavToEdit(id),
                      margin: '0.25rem 0',
                    },
                    watcher.encrypted
                      ? {
                          label: 'Decrypt this watcher',
                          onClick: () => onDecrypt(id),
                          margin: '0.25rem 0',
                        }
                      : {
                          label: 'Encrypt this watcher',
                          onClick: () => {
                            let confirmed = true;
                            if (watcher.isPublic) {
                              confirmed = window.confirm(
                                'This watcher is public. You need to turn it into private to encrypt it.'
                              );
                            }
                            if (confirmed) {
                              onEncrypt(id);
                            }
                          },
                          margin: '0.25rem 0',
                        },
                    watcher.isPublic
                      ? {
                          label: 'Make it private',
                          onClick: () => onPrivate(id),
                          margin: '0.25rem 0',
                        }
                      : {
                          label: 'Make it public',
                          onClick: () => {
                            let confirmed = true;
                            if (watcher.encrypted) {
                              confirmed = window.confirm(
                                'This watcher is encrypted. You need to decrypt it to turn it into public.'
                              );
                            }

                            if (confirmed) {
                              onPublic(id);
                            }
                          },
                          margin: '0.25rem 0',
                        },
                    {
                      label: 'Delete',
                      color: 'status-critical',
                      onClick: () => onDelete(id),
                      margin: '0.25rem 0',
                    },
                  ]}
                />
              )}
            </HorizontalCenter>

            <HorizontalCenter>
              {!!watcher.gotValueAt && (
                <Text size="xsmall" margin="0 0.5rem 0 0">
                  {formatDateTime(watcher.gotValueAt)}
                </Text>
              )}

              {watcher.encrypted ? (
                <Secure
                  onClick={() => setModalMessage('This watcher is end-to-end encrytped.')}
                  size="20px"
                />
              ) : (
                <Insecure
                  onClick={() => setModalMessage('This watcher is not encrypted.')}
                  size="20px"
                />
              )}
              <Box width="0.25rem" />

              {watcher.isPublic ? (
                <FormView onClick={() => setModalMessage('This watcher is public.')} size="24px" />
              ) : (
                <FormViewHide
                  onClick={() => setModalMessage('This watcher is private.')}
                  size="24px"
                />
              )}
            </HorizontalCenter>
            <Anchor
              label={new URL(watcher.link).hostname}
              href={watcher.link}
              target="_blank"
              size="small"
            />
            <Text size="xsmall" wordBreak="break-word" margin="0 0 0.5rem">
              Selector: {watcher.selector}
            </Text>

            <Box pad="1rem" border={{ size: 'medium', style: 'ridge' }}>
              {watcher.contentLink ? (
                <Anchor label={watcher.content} href={watcher.contentLink} target="_blank" />
              ) : (
                <Text>{watcher.content}</Text>
              )}
            </Box>

            <WatcherSchedule watcher={watcher} isOwner={isOwner} />
            <WatcherTelegram watcher={watcher} isOwner={isOwner} />
            <WatcherHistory watcher={watcher} isOwner={isOwner} />

            <Modal show={!!modalMessage} onClose={() => setModalMessage('')}>
              {modalMessage}
            </Modal>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default WatcherDetails;

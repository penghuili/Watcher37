import { Anchor, Heading, Menu, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import WatcherAccess from '../../components/WatcherAccess';
import { WatcherContents } from '../../components/WatcherContents';
import { formatDateTime } from '../../shared/js/date';
import Confirm from '../../shared/react-pure/Confirm';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import AppBar from '../../shared/react/AppBar';
import WatcherHistory from './components/WatcherHistory';
import WatcherSchedule from './components/WatcherSchedule';
import WatcherTelegram from './components/WatcherTelegram';

function WatcherDetails({
  params: { id },
  watcher,
  canEdit,
  fetchError,
  isLoading,
  onFetchWatcher,
  onClearFetchError,
  onDelete,
  onNav,
  onEncrypt,
  onDecrypt,
  onPublic,
  onPrivate,
  onCreate,
}) {
  const [showMakePublicConfirm, setShowMakePublicConfirm] = useState(false);
  const [showEncryptConfirm, setShowEncryptConfirm] = useState(false);

  useEffect(() => {
    onFetchWatcher(id);
    return onClearFetchError;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <AppBar title="Watcher details" isLoading={isLoading} hasBack />
      <ContentWrapper>
        {!!fetchError && <Text size="large">{fetchError}</Text>}
        {!!watcher && (
          <>
            <HorizontalCenter>
              <Heading level="3" margin="0">
                {watcher.title}
              </Heading>
              {canEdit && (
                <Menu
                  icon={<MoreVertical />}
                  items={[
                    {
                      label: 'Edit',
                      onClick: () => onNav(`/w/${id}/edit`),
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
                            if (watcher.isPublic) {
                              setShowEncryptConfirm(true);
                            } else {
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
                            if (watcher.encrypted) {
                              setShowMakePublicConfirm(true);
                            } else {
                              onPublic(id);
                            }
                          },
                          margin: '0.25rem 0',
                        },
                    {
                      label: 'Duplicate',
                      onClick: () =>
                        onCreate({
                          title: `Copy - ${watcher.title}`,
                          link: watcher.link,
                          selectors: watcher.selectors,
                        }),
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

              <WatcherAccess watcher={watcher} />
            </HorizontalCenter>
            <Anchor
              label={new URL(watcher.link).hostname}
              href={watcher.link}
              target="_blank"
              size="small"
              margin="0 0 0.5rem"
            />

            <WatcherContents contents={watcher.contents} />

            <WatcherSchedule watcher={watcher} canEdit={canEdit} />
            <WatcherTelegram watcher={watcher} canEdit={canEdit} />
            <WatcherHistory watcher={watcher} canEdit={canEdit} />
          </>
        )}

        <Confirm
          message="This watcher is public. It will be turned into private after it's encrypted."
          show={showEncryptConfirm}
          onClose={() => setShowEncryptConfirm(false)}
          onConfirm={() => onEncrypt(id)}
        />
        <Confirm
          message="This watcher is encrypted. It will be decrypted after it's public."
          show={showMakePublicConfirm}
          onClose={() => setShowMakePublicConfirm(false)}
          onConfirm={() => onPublic(id)}
        />
      </ContentWrapper>
    </>
  );
}

export default WatcherDetails;

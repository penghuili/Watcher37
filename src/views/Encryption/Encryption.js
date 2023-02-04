import { Anchor, Heading, Image, Text } from 'grommet';
import React from 'react';

import encryption1 from '../../assets/images/encryption1.png';
import encryption2 from '../../assets/images/encryption2.png';
import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import Pitch from '../../components/Pitch';

function Encryption() {
  return (
    <>
      <AppBar title="How encryption works in PageWatcher?" hasBack />
      <ContentWrapper>
        <Pitch />

        <Text margin="3rem 0 0">
          PageWatcher uses the famous{' '}
          <Anchor label="openpgpjs" href="https://github.com/openpgpjs/openpgpjs" target="_blank" />{' '}
          algorithm (used by <Anchor label="Proton" href="https://proton.me/" target="_blank" />) to
          do the encryption, end-to-end. See how it works{' '}
          <Anchor
            label="here"
            href="https://proton.me/blog/what-is-pgp-encryption"
            target="_blank"
          />
          .
        </Text>

        <Heading level="3" margin="3rem 0 0">
          When you signup:
        </Heading>
        <Text margin="1rem 0 0">1. PageWatcher generates a public & private key pair.</Text>
        <Text margin="1rem 0 0">2. Then it encrypts the private key with your password;</Text>
        <Text margin="1rem 0 0">
          3. Then it sends your username, public key, encrypted private key to server;{' '}
          <Text weight="bold" color="status-ok">
            Your password never leaves your device!!!
          </Text>{' '}
          Most websites send your password in plain text to their server.
        </Text>

        <Heading level="3" margin="3rem 0 0">
          When you sign in:
        </Heading>
        <Text margin="1rem 0 0">
          1. Your device makes a request with your username to get your public key, encrypted
          private key, and a challenge encrypted with your public;
        </Text>
        <Text margin="1rem 0 0">
          2. Your device decrypts the encrypted private key with your password;
        </Text>
        <Text margin="1rem 0 0">
          3. Then it uses the decrypted private key to decrypt the challenge, and send the decrypted
          challenge to server;
        </Text>
        <Text margin="1rem 0 0">
          4. Server checks is the challenge is solved, if yes, it will return an access token and a
          refresh token back to your device, and you are logged in. So again,{' '}
          <Text weight="bold" color="status-ok">
            your password never leaves your device!!!
          </Text>
        </Text>

        <Heading level="3" margin="3rem 0 0">
          When you create / update a watcher:
        </Heading>
        <Text margin="1rem 0 0">
          1. Your device encrypts the watcher name, link, selector with your public key;
        </Text>
        <Text margin="1rem 0 0">
          <Text weight="bold" color="status-critical">
            NOTE!!
          </Text>{' '}
          PageWatcher's server will check the web pages regularly, it needs to know the link and
          selector. So when you create a watcher, your device will also encrypt the link and
          selector with the server's public key. But still, everything is encrypted before saving
          into database.
        </Text>
        <Text margin="1rem 0 0">
          2. Your device sends the encrypted contents to server, which will be saved in database;
        </Text>

        <Heading level="3" margin="3rem 0 0">
          When PageWatcher's server finds new content:
        </Heading>
        <Text margin="1rem 0 0">
          1. Server encrypts the content with your public key, and save the encrypted version into
          database;
        </Text>
        <Text margin="1rem 0 0">
          2. If you integrate Telegram, it will send a message like this to you:
        </Text>
        <Image src={encryption1} fill="vertical" />
        <Text margin="1rem 0 0">
          Everything is encrypted, so it can't reveal anything in the message.
        </Text>

        <Heading level="3" margin="3rem 0 0">
          When you decrypt a watcher:
        </Heading>
        <Text margin="1rem 0 0">
          1. Your device decrypts the watcher's content, and send the plain text to server, which
          will be safed in database;
        </Text>
        <Text margin="1rem 0 0">Note: it won't decrypt the content history.</Text>
        <Text margin="1rem 0 0">
          2. Now server knows more about the watcher, it can send messages like this to you:
        </Text>
        <Image src={encryption2} fill="vertical" />

        <Heading level="3" margin="3rem 0 0">
          When you make a watcher public:
        </Heading>
        <Text margin="1rem 0 0">
          1. You need to firstly decrypt the watcher, before making it public. Because only you can
          decrypt the encrypted content, it doesn't make sense to public the decrypted version.
        </Text>
        <Text margin="1rem 0 0">
          2. Then you can make the watcher public in the watcher's menu bar;
        </Text>
        <Text margin="1rem 0 0">3. Now anyone with the watcher's link can view its content;</Text>
        <Text margin="1rem 0 0">
          4. If you integrate a Telegram channel, they can also join the channel, and get notified;
        </Text>
      </ContentWrapper>
    </>
  );
}

export default Encryption;

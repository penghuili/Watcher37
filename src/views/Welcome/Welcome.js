import { Anchor, Avatar, Heading } from 'grommet';
import React from 'react';
import ExampleWatchers from '../../components/ExampleWatchers';
import Pitch from '../../components/Pitch';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import Spacer from '../../shared/react-pure/Spacer';
import ChangeTheme from '../../shared/react/ChangeTheme';
import RouteLink from '../../shared/react/RouteLink';
import { encryptionUrl, logo, privacyUrl, termsUrl } from '../../shared/react/initShared';

function Welcome() {
  return (
    <>
      <ContentWrapper>
        <HorizontalCenter margin="2rem 0 1rem">
          <Avatar src={logo} />{' '}
          <Heading level="2" margin="0 0 0 1rem">
            Watcher37
          </Heading>
        </HorizontalCenter>
        <Pitch />

        <Spacer />
        <Divider />
        <Spacer />

        <ExampleWatchers />

        <Spacer />
        <Divider />
        <Spacer />

        <RouteLink to="/sign-up" label="Sign up" />
        <Spacer />
        <RouteLink to="/sign-in" label="Sign in" />

        <Spacer />
        <Divider />
        <Spacer />

        <Anchor
          label="Motivation"
          href="https://encrypt37.com/watcher37/motivation/"
          target="_blank"
        />
        <Spacer />
        <Anchor label="How it works?" href="https://encrypt37.com/watcher37/how" target="_blank" />
        <Spacer />
        <Anchor
          label="Limitations"
          href="https://encrypt37.com/watcher37/limitations/"
          target="_blank"
        />
        <Spacer />
        <Anchor label="Encryption" href={encryptionUrl} target="_blank" />
        <Spacer />
        <Anchor
          label="How to find selector?"
          href="https://encrypt37.com/watcher37/selectors/"
          target="_blank"
        />
        <Spacer />
        <Anchor label="Source code" href="https://github.com/penghuili/Watcher37" target="_blank" />
        <Spacer />
        <RouteLink label="Pricing" to="/pricing" />
        <Spacer />
        <Anchor label="Privacy" href={privacyUrl} target="_blank" />
        <Spacer />
        <Anchor label="Terms" href={termsUrl} target="_blank" />
        <Spacer />
        <Anchor label="Contact" href="https://peng37.com/contact" target="_blank" />
        <Spacer />
        <Divider />
        <Spacer />

        <ChangeTheme />
      </ContentWrapper>
    </>
  );
}

export default Welcome;

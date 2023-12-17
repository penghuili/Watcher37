import { Anchor, Heading, Image, Text } from 'grommet';
import React from 'react';

import { contactEmail } from '../../shared/js/constants';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import AppBar from '../../shared/react/AppBar';

function HowToFindSelector() {
  return (
    <>
      <AppBar title="How to find the selector of a content?" hasBack />
      <ContentWrapper>
        <Text>
          It would be easier if you have some CSS selector knowledge,{' '}
          <Anchor label="here" href="https://vegibit.com/css-selectors-tutorial/" target="_blank" />{' '}
          is a very good summary.
        </Text>
        <Text>
          But no worries if you don't know CSS selector, you can use the following{' '}
          <Text weight="bold">3 ways</Text> to find the selector.
        </Text>
        <Text margin="0 0 3rem">
          If you still have troubles, contact me at{' '}
          <Anchor label={contactEmail} href={`mailto:${contactEmail}`} target="_blank" />, I will
          find the selector for you.
        </Text>

        <Heading level="3" margin="0 0 1rem">
          1. With a Chrome extension on your computer
        </Heading>
        <Text>
          (1). Open Chrome on your <Text weight="bold">computer</Text>.
        </Text>

        <Text margin="1rem 0 0">
          (2). Install the <Text weight="bold">"Copy Css Selector"</Text> Chrome extension,{' '}
          <Anchor
            label="here"
            href="https://chrome.google.com/webstore/detail/copy-css-selector/kemkenbgbgodoglfkkejbdcpojnodnkg/"
            target="_blank"
          />
        </Text>

        <Text margin="1rem 0 0">
          (3). Open the web page you want to watch, and find the content you are interested, then
          right click on it.
        </Text>

        <Text margin="1rem 0 0">
          (4). Then click <Text weight="bold">"Copy CSS Selector"</Text>, now you copied the
          selector!
        </Text>
        <Image src={`${process.env.REACT_APP_ASSETS_FOR_CODE}/selector4.png`} fill="horizontal" />

        <Text margin="1rem 0 0">
          (5). Go back to the watcher creation form, and paste this selector.
        </Text>

        <Heading level="3" margin="3rem 0 1rem">
          2. With Chrome's developer tool on your computer
        </Heading>
        <Text>
          (1). Open the link with Chrome on your <Text weight="bold">computer</Text>.
        </Text>

        <Text margin="1rem 0 0">
          (2). Find the content you want to watch, right click it. You will see something like:
        </Text>
        <Image src={`${process.env.REACT_APP_ASSETS_FOR_CODE}/selector1.png`} fill="horizontal" />

        <Text margin="1rem 0 0">
          (3). Click <Text weight="bold">"Inspect"</Text>, you will open the develper's tool, and
          the element you selected will be highlighted.
        </Text>
        <Image src={`${process.env.REACT_APP_ASSETS_FOR_CODE}/selector2.png`} fill="horizontal" />

        <Text margin="1rem 0 0">
          (3). Right click the hightlighted element (You can also choose a different element) -&gt;
          Hover on <Text weight="bold">"Copy"</Text> -&gt; Click{' '}
          <Text weight="bold">"Copy selector"</Text>. Now you copied the selector!
        </Text>
        <Image src={`${process.env.REACT_APP_ASSETS_FOR_CODE}/selector3.png`} fill="horizontal" />

        <Text margin="1rem 0 0">
          (4). Go back to the watcher creation form, and paste this selector.
        </Text>

        <Heading level="3" margin="3rem 0 1rem">
          3. With Kiwi browser on your Android phone
        </Heading>
        <Text>
          I wrote a blog post on this:{' '}
          <Anchor
            label="Debug with browser developer tools on Android"
            href="https://encrypt37.com/blog/20230226-debug-with-browser-developer-tools-on-android/"
            target="
          "
          />
        </Text>
      </ContentWrapper>
    </>
  );
}

export default HowToFindSelector;

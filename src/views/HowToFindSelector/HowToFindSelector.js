import { Anchor, Heading, Image, Text } from 'grommet';
import React from 'react';

import selector1 from '../../assets/images/selector1.png';
import selector2 from '../../assets/images/selector2.png';
import selector3 from '../../assets/images/selector3.png';
import selector4 from '../../assets/images/selector4.png';
import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';

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
          But no worries if you don't know CSS selector, you can use the following ways to find the
          selector.
        </Text>
        <Text margin="0 0 3rem">
          If you still have troubles, contact me at{' '}
          <Anchor label="peng@duck.com" href="mailto:peng@duck.com" target="_blank" />, I will find
          the selector for you.
        </Text>

        <Heading level="3" margin="0 0 1rem">
          一. With a Chrome extension
        </Heading>
        <Text>
          1. Open Chrome on your <Text weight="bold">computer</Text>. Phones can't find selector.
        </Text>

        <Text margin="1rem 0 0">
          2. Install the <Text weight="bold">"Copy Css Selector"</Text> Chrome extension,{' '}
          <Anchor
            label="here"
            href="https://chrome.google.com/webstore/detail/copy-css-selector/kemkenbgbgodoglfkkejbdcpojnodnkg/"
            target="_blank"
          />
        </Text>

        <Text margin="1rem 0 0">
          3. Open the web page you want to watch, and find the content you are interested, then
          right click on it.
        </Text>

        <Text margin="1rem 0 0">
          4. Then click <Text weight="bold">"Copy CSS Selector"</Text>, now you copied the selector!
        </Text>
        <Image src={selector4} fill="horizontal" />

        <Text margin="1rem 0 0">
          5. Go back to the watcher creation form, and paste this selector.
        </Text>

        <Heading level="3" margin="3rem 0 1rem">
          二. With Chrome's developer tool
        </Heading>
        <Text>
          1. Open the link with Chrome on your <Text weight="bold">computer</Text>. Phones cannot
          find the selector, and it's recommanded to use Chrome.
        </Text>

        <Text margin="1rem 0 0">
          2. Find the content you want to watch, right click it. You will see something like:
        </Text>
        <Image src={selector1} fill="horizontal" />

        <Text margin="1rem 0 0">
          3. Click <Text weight="bold">"Inspect"</Text>, you will open the develper's tool, and the
          element you selected will be highlighted.
        </Text>
        <Image src={selector2} fill="horizontal" />

        <Text margin="1rem 0 0">
          3. Right click the hightlighted element (You can also choose a different element) -&gt;
          Hover on <Text weight="bold">"Copy"</Text> -&gt; Click{' '}
          <Text weight="bold">"Copy selector"</Text>. Now you copied the selector!
        </Text>
        <Image src={selector3} fill="horizontal" />

        <Text margin="1rem 0 0">
          4. Go back to the watcher creation form, and paste this selector.
        </Text>
      </ContentWrapper>
    </>
  );
}

export default HowToFindSelector;
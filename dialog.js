// This code has been adapted from Ouyang Yadong's
// Digital Ocean Space Client example code, licensed
// under the GPLv3.

import React from 'react';
import gui from 'gui';
import { render } from 'react-yue';

const DEFAULT_SIZE = {
  height: 200,
  width: 440,
};

export function alert(messageText, titleText, options = {}) {
  if (!messageText) {
    return false;
  } else if (!titleText) {
    titleText = 'Alert';
  }

  const { size = DEFAULT_SIZE, title = titleText } = options;
  const dialogWindow = gui.Window.create({});
  const container = gui.Container.create();

  dialogWindow.setTitle(title);
  dialogWindow.setContentSize(size);
  dialogWindow.setAlwaysOnTop(true);
  container.setStyle({ flexDirection: 'row' });
  dialogWindow.setContentView(container);
  render(
    <container
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <label text={messageText} />
      <button
        onClick={() => dialogWindow.close()}
        title="OK"
      />
    </container>,
    container
  );
  dialogWindow.center();
  dialogWindow.activate();
  return dialogWindow;
}


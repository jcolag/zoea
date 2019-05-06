import React, { Component } from 'react';
import gui from 'gui';
import { render } from 'react-yue';
//import Sidebar from './sidebar';
//import MessagePanel from './messagepanel';
import { alert } from './dialog';

const ssbClient = require('ssb-client');
const pull = require('pull-stream');

class MainWindow extends Component {
  constructor(props) {
    super(props);
    const timeoutId = setTimeout(this.stubData, 500, this);
    this.state = {
      endIdx: 4,
      messages: [],
      sideElements: [],
      startIdx: 0,
      timeoutId,
    }
  }
  
  stubData(who) {
    const messages = [];
    const sideElements = [
      "Sidebar",
    ];
    
    clearTimeout(who.state.timeoutId);
    ssbClient(function (err, sbot) {
      let scutId;
      if (err) {
        alert(err, "SSB Client Error");
        throw err;
      }

      sbot.whoami(function(err, info) {
        const stream = sbot.createUserStream({
          id: info.id,
        });
        pull (stream, pull.collect((err, msgs) => {
          if (err) {
            alert(err, "SSB Client Error");
            sbot.close();
            throw err;
          }
          msgs.forEach(m => {
            if (m.value.content.type !== 'post') {
              return;
            }
            messages.push({
              author: m.value.author,
              contents: m.value.content.text,
              ts: new Date(m.value.timestamp),
            });
          });
          messages.reverse();
          who.setState({
            messages,
            sideElements,
            timeoutId: null,
          });
          sbot.close();
        }));
      });
    });
  }
  
  render() {
//    if (this.state.messages.length === 0) {
//      return null;
//    }

    return (
      <container
        style={{
          flexDirection: 'row',
          flex: 1,
        }}
      >
        <container
          style={{
            alignItems: 'flex-start',
            backgroundColor: '#808080',
            color: '#000000',
            flex: 1,
            flexDirection: 'ltr',
            justifyContent: 'flex-start',
            width: 200,
          }}
        >
          <label
            text="   Sidebar"
            font={
              gui.Font.default().derive(14, 'bold', 'normal')
            }
          />
          <label
            text="a"
          />
          <label
            text="b"
          />
          <label
            text="c"
          />
        </container>
        <container
          style={{
            flexDirection: 'column',
            flex: 3,
          }}
        >
          <label
            text="Messages"
            font={
              gui.Font.default().derive(14, 'bold', 'normal')
            }
          />
          <label
            text="2!"
          />
          <label
            text="3!"
          />
          <label
            text="4!"
          />
        </container>
      </container>
    );
  }
}

const menu = gui.MenuBar.create([
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        onClick: () => gui.MessageLoop.quit()
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'select-all' },
      { type: 'separator' },
      { role: 'undo' },
      { role: 'redo' },
    ],
  },
]);

const win = gui.Window.create({
  frame: true,
  showTrafficLights: true,
});
const contentView = gui.Container.create();

contentView.setStyle({ flexDirection: 'row' });
win.setContentSize({
  width: 1300,
  height: 800,
});
win.onClose = () => gui.MessageLoop.quit();
win.setTitle('Zoea');
win.setContentView(contentView);
if (process.platform == 'darwin') {
  gui.app.setApplicationMenu(menu);
} else {
  win.setMenuBar(menu);
}
win.center();
win.activate();
render(<MainWindow />, contentView);
if (!process.versions.yode) {
  gui.MessageLoop.run();
  process.exit(0);
}


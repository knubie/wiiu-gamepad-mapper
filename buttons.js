// This file just contains a list of buttons on the Wii U gamepad for use
// with the window.wiiu.gamepad.hold bitmask available on the client-side.

// See http://wiiubrew.org/wiki/Internet_Browser#Buttons for more info.

module.exports = {
  // The list of buttons, in order of their bitmap position.
  list: [
    'lStickLeft',
    'lStickRight',
    'lStickUp',
    'lStickDown',
    'rStickLeft',
    'rStickRight',
    'rStickUp',
    'rStickDown',
    '8',
    '9',
    '10',
    '11',
    'lStickClick',
    'rStickClick',
    'tv',
    'a',
    'b',
    'x',
    'y',
    'dPadLeft',
    'dPadRight',
    'dPadUp',
    'dPadDown',
    'zl',
    'zr',
    'l',
    'r',
    'plus',
    'minus',
    'home'
  ],

  // The state of each button. True is pressed, false is not pressed.
  states: {
    'lStickLeft': false,
    'lStickRight': false,
    'lStickUp': false,
    'lStickDown': false,
    'rStickLeft': false,
    'rStickRight': false,
    'rStickUp': false,
    'rStickDown': false,
    '8': false,
    '9': false,
    '10': false,
    '11': false,
    'lStickClick': false,
    'rStickClick': false,
    'tv': false,
    'a': false,
    'b': false,
    'x': false,
    'y': false,
    'dPadLeft': false,
    'dPadRight': false,
    'dPadUp': false,
    'dPadDown': false,
    'zl': false,
    'zr': false,
    'l': false,
    'r': false,
    'plus': false,
    'minus': false,
    'home': false
  }
};

# Using the Wii U mapper
This applications maps gamepad input to keypresses and mouse movements on the computer running it.

## How it works.
This application is a node.js server. It serves a single webpage. When connecting to the webpage on the Wii U's browser, it sends data to the node.js server via websockets containing the current state of the gamepad, including all pressed buttons, analog sticks, and motion sensors.

## Dependencies
The node server depends on socket.io to handle the websockets and robot.js to emulate keypresses and mouse movements.

## Customization
To customize the script, simply edit index.js. The program should be self-explanitory.

## Limitations
As of now the Y button is off-limits, as it opens up the bookmarks panel on the Wii U browser, and holding down the B button will close the web page. Aside from that, all of the other buttons work fine, so long as only one tab is open.

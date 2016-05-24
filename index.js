var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var robot = require('robotjs');
var buttons = require('./buttons');

var screenSize = robot.getScreenSize();

// How fast the cursor moves from the gyro, higher is faster.
var gyroMultiplier = screenSize.width * 0.35;
// How fast the cursor moves from the analog stick, higher is faster.
var stickMultiplier = screenSize.width * 0.055;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });


  var readAxis = function readAxis(thisAxis, range) {
		// Add one then scale to a (0, range) reading
    var center = range / 2;
    var reading = (thisAxis + 1) * (range / 2);
    var distance = reading - center;

    return distance < 0 ? Math.floor(distance + 1) : Math.floor(distance);
  };

  robot.setMouseDelay(1);
  robot.setKeyboardDelay(1);

  var mapButton = function mapButton(hold, button, down, up) {
    if (hold & 0x7f86fffc & 0x40000000 >>> buttons.list.indexOf(button)) {
      if (!buttons.states[button]) {
        down();
        buttons.states[button] = true;
      }
    } else {
      if (buttons.states[button]) {
        up();
        buttons.states[button] = false;
      }
    }
  }

  socket.on('gamepad', function(data) {
    var mouse = robot.getMousePos();
    var xReading = readAxis(data.gyroZ, gyroMultiplier);
    var yReading = readAxis(data.gyroX, gyroMultiplier);
    var xStickReading = readAxis(data.rStickX, stickMultiplier);

    robot.moveMouse(
      // Use min & max to stay within screen size.
      Math.min(
        Math.max(
          mouse.x - xReading + xStickReading
        , 0)
      , screenSize.width - 1),
      Math.min(
        Math.max(
          mouse.y + yReading
        , 0)
      , screenSize.height - 1)
    );

    mapButton(data.hold, 'zr',
      function() { robot.mouseToggle('down', 'left'); },
      function() { robot.mouseToggle('up', 'left'); });

    mapButton(data.hold, 'zl',
      function() { robot.mouseToggle('down', 'right'); },
      function() { robot.mouseToggle('up', 'right'); });

    mapButton(data.hold, 'lStickUp',
      function() { robot.keyToggle('w', 'down'); },
      function() { robot.keyToggle('w', 'up'); });

    mapButton(data.hold, 'lStickDown',
      function() { robot.keyToggle('s', 'down'); },
      function() { robot.keyToggle('s', 'up'); });

    mapButton(data.hold, 'lStickLeft',
      function() { robot.keyToggle('a', 'down'); },
      function() { robot.keyToggle('a', 'up'); });

    mapButton(data.hold, 'lStickRight',
      function() { robot.keyToggle('d', 'down'); },
      function() { robot.keyToggle('d', 'up'); });

    mapButton(data.hold, 'b',
      function() { robot.keyToggle('space', 'down'); },
      function() { robot.keyToggle('space', 'up'); });

    mapButton(data.hold, 'a',
      function() { robot.keyToggle('e', 'down'); },
      function() { robot.keyToggle('e', 'up'); });

  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

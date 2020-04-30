# All projects are contributed by Semi Su

## Arduino
source code created by Arduino IDE

- BasicOTA: update code over the air using nodemcu32s 
- nodemcu32s_built_in_led: basic demo
- nodemcu32s_serial_test: basic demo
- nodemcu32s_sensor: basic demo
- nodemcu32s_thermoprinter: demo code to run the thermoprinter by nodemcu32s
- touch_OTA23: wireless updating code and monitoring sensor value through OTA23  
- tiny85_test: basic demo using tiny85

## Platform IO
source code created by Platform IO IDE

- nodemcu32s_9btn: receive digital signals (on/off) from 9 buttons based on HEF4021B
- nodemcu32s_18IO: receive digital signals (on/off) from 9 buttons, and output 9 LED states based on HEF4021B and 74HC595
- nodemcu32s_74HC595: demo to use 74HC595
- nodemcu32s_ledc: demo for pwm control
- nodemcu32s_software_serial: digital simulation of serial port
- nodemcu32s_solar: use solar panel as optical sensor
- nodemcu32s_step_driver: basic functionality, use TB6600 driver and nodemcu32s to control stepper motor
- nodemcu32s_steppermotor: use TB6600 driver and nodemcu32s to control stepper motor
- nodemcu32s_steppermotor_v2: include a potentiometer as input to control motor and send/recevie cmds to/from Unity  
- nodemcu32s_thermo: demo code to run the thermoprinter by nodemcu32s
- nodemcu32s_ws2812: demo code to control WS2812 LED strip
- oc_pc817: use 1 photocoupler as a switch to control bloon machine
- oc_pc817_4sw: use 4 photocouplers as a switch to control bloon machine
- unity: read data sent from unity through serial port

## Unity

It's about bidirectional communications between Arduino and Unity. Serialport is the main protocol and implemented by Unity plugin Ardity.

- arduino: arduino code
- arduino_ardity_demo: arduino code 
- unity_ardity_demo: unity scenes and ardity c# scripts
- unity_biDirectional: unity c# scripts for gui and gameobject
- unity_fromArduino: unity c# scripts for gui and gameobject
- unity_toArduino: unity c# scripts for gui and gameobject

## thermo
A GUI app for thermoprinter built through react.js

## thermo_realtime (WIP)
Add more functions such as print graphics based on project "thermo".
In addition to react.js, this project includes P5.js to handle graphics.

## thermo_server
A server to communicate between front-end apps (thermo or thermo_realtime) and mcu (arduino or nodemcu32s) by serial port.



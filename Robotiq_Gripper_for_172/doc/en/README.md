# JODELL Gripper AddOn

This AddOn is compatible with the JODELL RG series grippers. It includes gripper instruction blocks and a gripper control page.

## Plugin Information

- **Name**: JODELL_Gripper_v1.1.1.tar.gz
- **Version**: v1.1.1

## Installation Guide

### System Requirements

- Controller: v1.7.1.46 or above, x64 controller
- App: coboπ 2.1.10 or Zu App v1.7.1.52 or above

### Installing the Plugin

Open App-Applications, or go to App Settings - System Settings - Add-ons to import and install the plugin.

<div align="center"><img width="800" alt="Install plugin" src="/addon/JODELL_Gripper/doc/img/plugin-install.png"/></div>
### Installing the Gripper

#### Method 1: Connect via the Controller Cabinet RS485 Channel

##### Electrical Connection

The JODELL RG series electric grippers are powered by DC24V and support Modbus communication control.

**485 signal pin wiring definitions**

| Function | Pin  | Wire | Numeric Mark |
|----------|------|------|--------------|
| 485      | A    | White| 1            |
| 485      | B    | Black| 2            |

**Power pin wiring definitions**

| Wire  | Spec   |
|-------|--------|
| Blue  | DC0V   |
| Brown | DC24V  |

**RG52-050 IO signal pin wiring definitions**

| Function    | Pin  | Wire   |
|-------------|------|--------|
| IO Input    | IN1  | Green  |
| IO Input    | IN2  | Orange |
| IO Output   | O1   | Yellow |
| IO Output   | O2   | Pink   |
| 485         | A    | White  |
| 485         | B    | Black  |
| IO Power    | DC24V| Brown  |
| IO Power    | DC0V | Blue   |

<div align="center"><img width="500" alt="Wiring diagram" src="/addon/JODELL_Gripper/doc/img/cabinet-wiring.jpg"/></div>
> **Note**: A 120Ω terminating resistor is required when wiring. YAGEO MF0207FTE52-120R is recommended.

<div align="center"><img width="500" alt="Terminating resistor" src="/addon/JODELL_Gripper/doc/img/rs485-terminal-resistor.png"/></div>
**WEB App or Zu App operations:**

Open WEB App - I/O Panel - Jump to edit, add extended I/O, edit and set it to `Jodell_cab`

<div align="center"><img width="800" alt="WEB App I/O panel settings" src="/addon/JODELL_Gripper/doc/img/web-app-io-panel.jpg"/></div>
<div align="center"><img width="800" alt="WEB App I/O panel settings 2" src="/addon/JODELL_Gripper/doc/img/web-app-jodell-cab.jpg"/></div>
Open Zu App - I/O Panel, add extended I/O, edit and set it to `Jodell_cab`

<div align="center"><img width="800" alt="Zu App I/O panel settings" src="/addon/JODELL_Gripper/doc/img/zu-app-jodell-cab.png"/></div>
After configuring with the JODELL gripper's default communication parameters and address table, run the extended I/O.

<div align="center"><img width="800" alt="Communication parameter configuration" src="/addon/JODELL_Gripper/doc/img/cabinet-modbus-config.png"/></div>
#### Method 2: Connect the Gripper to the Robot TIO Interface Using the Adapter Cable Provided by JODELL (Compatible with JAKA End TIO)

<div align="center">
  <img width="300" alt="Robot end TIO interface" src="/addon/JODELL_Gripper/doc/img/robot-tio-port.jpg"/>
  <img width="100" alt="JODELL adapter cable" src="/addon/JODELL_Gripper/doc/img/jodell-adapter-cable.jpg"/>
  <img width="180" alt="RG gripper" src="/addon/JODELL_Gripper/doc/img/rg-gripper.jpg"/>
</div>

Run the plugin and click the "gear" button in the plugin operation options bar to enter the configuration page.

<div align="center"><img width="800" alt="Configuration entry" src="/addon/JODELL_Gripper/doc/img/plugin-config.png"/></div>
## Configuration Guide

### Configuring the Plugin

- **Socket port**: The gripper custom commands use socket communication and occupy one socket port. You can modify the port number if there is a conflict.
- **Modbus type**: Select the gripper connection method. Choose `TIO` when connecting via the end TIO, and `Cabinet` when connecting via the controller cabinet RS485.

### Communication Configuration

The following configuration is required for TIO connection:

**Step 1**: In the I/O Panel, multiplex the tool I/O as RS485 channel 1

<div align="center"><img width="800" alt="Step 1: RS485 channel multiplexing" src="/addon/JODELL_Gripper/doc/img/tio-rs485-signals.png"/></div>
**Step 2**: Configure the Modbus parameters. The register addresses follow the JODELL gripper manual; a refresh frequency of 1 to 10 is recommended. Then configure the baud rate and other parameters according to the communication parameters.

<div align="center"><img width="500" alt="Step 2: Modbus parameter configuration" src="/addon/JODELL_Gripper/doc/img/rs485-signal-edit.png"/></div>
**Step 3**: Add RS485 channel 1 signals s1, s2, s3 with addresses of input registers 2000, 2001, 2002 respectively.

### Main Interface

Users can control the gripper from the main interface.

<div align="center"><img width="800" alt="Main interface" src="/addon/JODELL_Gripper/doc/img/plugin-entry.png"/></div>
### Fault Information

When any indicator light turns red, the gripper is in the corresponding fault state.

> Note: When the gripper is not connected, all status feedback defaults to no fault.

<div align="center"><img width="800" alt="Fault information" src="/addon/JODELL_Gripper/doc/img/gripper-control-page.png"/></div>
## Usage Instructions

### Instruction Blocks

Find the gripper instruction blocks in the App programming page - Extensions.

<div align="center"><img width="800" alt="Instruction block location" src="/addon/JODELL_Gripper/doc/img/fault-indicators.jpg"/></div>
**Instruction 1** - Gripper enable: Controls gripper enable and disable.

<div align="center"><img width="800" alt="Instruction block" src="/addon/JODELL_Gripper/doc/img/instruction-blocks.png"/></div>
**Instruction 2** - Control gripper: Supports speed (1-255), force (1-255), and position control (0-255).

> Note:
> 1. Speed, force, and position values only support positive integers.
> 2. When using TIO to connect the RG series high-power grippers, it is recommended to set the speed and force below 128.

**Instruction 3** - Get gripper enable status: The first parameter of the dropdown is the enable status, the second parameter is the gripping status, and the third parameter is the gripper position. The gripping status values (0,1,2,3) correspond to the following:

- 0 No object detected
- 1 Object detected while fingers are opening
- 2 Object detected while fingers are closing
- 3 Fingers have reached the specified position, no object detected

### Example Program

Disable the gripper first, then enable it, and move back and forth between positions `10` and `255` (open first, then close), and read the gripper status using `jodell get gripper status`.

The gripper performs a self-check (open and close once) during the enable process.

<div align="center"><img width="500" alt="Example program" src="/addon/JODELL_Gripper/doc/img/example-program.png"/></div>
> Note:
> 1. When using TIO connection control, set the refresh rate of each signal during initialization.
> 2. When using cabinet connection, set `Jodell_cab` as the first extended I/O module.

## Troubleshooting

### Common Issues

If a workpiece gets stuck or the gripper jams for other reasons during the enable process, the gripper zero position may shift. Power off and restart the gripper, then re-enable it.

## Updates and Upgrades

### v1.1.1

- Developed based on AddOn 3.0, supporting Modbus RTU (RS485) connection for controller cabinet 2.1 and minicab.
- Developed based on the RG series communication manual.
- Control page control support.

## Support and Contact

Learn more about AddOns: https://www.jaka.com/docs/guide/1.7.2/addOn/1.1-AboutAddOn.html

- Contact JAKA sales or technical staff.

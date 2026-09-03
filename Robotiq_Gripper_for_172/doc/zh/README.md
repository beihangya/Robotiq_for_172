# 钧舵夹爪插件

该 AddOn 适用于钧舵夹爪 RG 系列，包括夹爪指令块和夹爪控制页面。

## 插件信息

- 名称：`JODELL_Gripper_v1.1.1.tar.gz`
- 版本：`v1.1.1`

## 安装指南

系统要求：

- 控制器：v1.7.1.46 及以上，x64 控制器
- App：coboπ 2.1.10，或 Zu App v1.7.1.52 以上

安装插件

打开 App 的“应用”，或进入“App 设置 > 系统设置 > 附加程序”，导入并安装该插件。

<div align="center"><img width="800" alt="安装钧舵夹爪插件" src="/addon/JODELL_Gripper/doc/img/plugin-install.png"/></div>

安装夹爪

**方法一：通过控制柜 RS485 通道连接**

电气连接

钧舵 RG 系列机器人电动夹爪采用 DC24V 供电，支持 Modbus 通讯控制。

**485 信号引脚线序定义**

| 功能 | 编号 | 线缆 | 号码数字标识 |
| --- | --- | --- | --- |
| 485 | A | 白 | 1 |
| 485 | B | 黑 | 2 |

**电源引脚线序定义**

| 电缆 | 规格 |
| --- | --- |
| 蓝 | DC0V |
| 棕 | DC24V |

**RG52-050 IO 信号引脚线序定义**

| 功能 | 编号 | 线缆 |
| --- | --- | --- |
| IO 输入 | IN1 | 绿色 |
| IO 输入 | IN2 | 橙色 |
| IO 输出 | O1 | 黄色 |
| IO 输出 | O2 | 粉色 |
| 485 | A | 白色 |
| 485 | B | 黑色 |
| IO 供电端 | DC24V | 棕色 |
| IO 供电端 | DC0V | 蓝色 |

<div align="center"><img width="500" alt="控制柜接线位置" src="/addon/JODELL_Gripper/doc/img/cabinet-wiring.jpg"/></div>
<div align="center"><img width="500" alt="RS485 接口连接单个外部设备" src="/addon/JODELL_Gripper/doc/img/rs485-terminal-resistor.png"/></div>
> 注意：接线时需要连接 120Ω 终端电阻，推荐使用 YAGEO MF0207FTE52-120R 型号电阻。

##### WEB App 或 Zu App 操作

打开 WEB App，进入“I/O 面板 > 跳转编辑”，添加扩展 I/O，编辑并设置为 Jodell_cab。

<div align="center"><img width="800" alt="WEB App I/O 面板" src="/addon/JODELL_Gripper/doc/img/web-app-io-panel.jpg"/></div>
<div align="center"><img width="800" alt="WEB App 添加 Jodell_cab" src="/addon/JODELL_Gripper/doc/img/web-app-jodell-cab.jpg"/></div>
打开 Zu App 的 I/O 面板，添加扩展 I/O，编辑并设置为 Jodell_cab。

<div align="center"><img width="800" alt="Zu App 添加 Jodell_cab" src="/addon/JODELL_Gripper/doc/img/zu-app-jodell-cab.png"/></div>
使用钧舵夹爪的默认通讯参数及地址表完成配置后，运行扩展 I/O。

<div align="center"><img width="800" alt="控制柜 Modbus 参数配置" src="/addon/JODELL_Gripper/doc/img/cabinet-modbus-config.png"/></div>

**方法二：通过机器人末端 TIO 接口连接**

使用钧舵提供的转接线（与 JAKA 末端 TIO 适配的型号），将夹爪连接到机器人 TIO 接口。

<div align="center">
  <img width="300" alt="机器人末端 TIO 接口" src="/addon/JODELL_Gripper/doc/img/robot-tio-port.jpg"/>
  <img width="100" alt="钧舵转接线" src="/addon/JODELL_Gripper/doc/img/jodell-adapter-cable.jpg"/>
  <img width="180" alt="RG 夹爪" src="/addon/JODELL_Gripper/doc/img/rg-gripper.jpg"/>
</div>

运行插件，点击插件操作选项栏中的“齿轮”按钮，进入配置页面。

<div align="center"><img width="800" alt="插件配置入口" src="/addon/JODELL_Gripper/doc/img/plugin-config.png"/></div>
- **Socket port**：夹爪自定义指令使用 Socket 通讯，会占用一个 Socket 端口；如有冲突，可以修改端口号。
- **Modbus type**：选择夹爪连接方式。通过末端 TIO 连接时选择 `TIO`；通过控制柜 RS485 连接时选择 Cabinet。

配置 TIO 通讯连接时，按以下步骤操作：

1. 在 I/O 面板中，将工具 I/O 复用为 RS485 通道 1，并根据通讯参数配置波特率等。

   <div align="center"><img width="800" alt="TIO RS485 信号量" src="/addon/JODELL_Gripper/doc/img/tio-rs485-signals.png"/></div>
2. 配置 Modbus 参数。寄存器地址根据钧舵夹爪手册填写，刷新频率建议设置在 1 到 10 之间。

3. 添加 RS485 通道 1 信号量 `s1`、`s2`、`s3`，地址依次为输入寄存器 `2000`、`2001`、`2002`。

   <div align="center"><img width="500" alt="编辑 RS485 信号量" src="/addon/JODELL_Gripper/doc/img/rs485-signal-edit.png"/></div>
## 配置指南

### 配置插件

运行插件后，可以点击“配置”进入夹爪相关操作。插件运行时会自动尝试连接夹爪。

<div align="center"><img width="800" alt="插件配置入口页面" src="/addon/JODELL_Gripper/doc/img/plugin-entry.png"/></div>
## 主界面

用户可在主界面中控制夹爪。

<div align="center"><img width="800" alt="夹爪控制主界面" src="/addon/JODELL_Gripper/doc/img/gripper-control-page.png"/></div>
## 故障信息

当某一个指示灯变红时，表示夹爪处于对应的故障状态。

> 注：未连接夹爪时，所有状态反馈默认为无故障。

<div align="center"><img width="800" alt="夹爪故障指示灯" src="/addon/JODELL_Gripper/doc/img/fault-indicators.jpg"/></div>
## 使用说明

### 指令块

在 App 编程页面的“扩展”中找到夹爪指令块。

<div align="center"><img width="800" alt="钧舵夹爪指令块" src="/addon/JODELL_Gripper/doc/img/instruction-blocks.png"/></div>
#### 指令一：夹爪使能

控制夹爪上使能与下使能。

#### 指令二：控制夹爪

支持以下参数：

- 速度：1-255
- 力度：1-255
- 位置：0-255

注意事项：

1. 速度、力度和位置值只支持正整数。
2. 使用 TIO 连接 RG 系列大功率夹爪时，速度和力建议设置在 128 以下。

#### 指令三：获取夹爪状态

下拉框参数含义如下：

1. 第一个参数：使能状态。
2. 第二个参数：夹持状态。
3. 第三个参数：夹爪位置。

夹持状态值说明：

| 状态值 | 含义 |
| --- | --- |
| 0 | 未检测到物体 |
| 1 | 手指在张开时检测到物体 |
| 2 | 手指在闭合时检测到物体 |
| 3 | 手指已到达指定位置，没有检测到物体 |

### 示例程序

让夹爪先下使能、再上使能，然后在 `10` 和 `255` 两个位置之间来回运动（先张开再闭合），并通过“JODELL 获取夹爪状态”读取夹爪相关状态。

上使能过程中，夹爪会进行自检（来回开关一次）。

注意事项：

1. 使用 TIO 连接控制时，请在初始化时设置各信号量的刷新率。
2. 使用控制柜连接时，请将 Jodell_cab设置为第一个扩展 I/O 模块。

<div align="center"><img width="500" alt="夹爪示例程序" src="/addon/JODELL_Gripper/doc/img/example-program.png"/></div>
## 故障排除

### 常见问题

如果在上使能过程中有工件卡住，或因其他原因卡死，会造成夹爪零位偏移。此时需要将夹爪断电重启，然后重新执行上使能操作。

## 更新和升级

### v1.1.1

- 基于 AddOn 3.0 开发，支持控制柜 cab2.1 和 minicab 的 Modbus RTU（RS485）连接。
- 基于 RG 系列通讯手册开发。
- 支持控制页面控制。

## 支持和联系方式

- [了解更多 AddOn 信息](https://www.jaka.com/docs/guide/1.7.2/addOn/1.1-AboutAddOn.html)
- 联系 JAKA 销售或技术人员获取支持。

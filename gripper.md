# gripper

| 数据方向                     | 机器人侧操作     | Modbus 起始寄存器 | `Byte 0` 的含义  |
| ---------------------------- | ---------------- | ----------------- | ---------------- |
| Robot Output / Gripper Input | 写给夹爪的命令   | `0x03E8`          | `ACTION REQUEST` |
| Robot Input / Gripper Output | 从夹爪读取的反馈 | `0x07D0`          | `GRIPPER STATUS` |

两个 `Byte 0` 的编号相同，只表示“各自数据区的第 0 个字节”，它们不是同一个字节：

```
写命令区：0x03E8
Byte 0 = ACTION REQUEST
bit0 = rACT，激活命令
bit3 = rGTO，执行到目标位置命令
Byte 3 = 目标位置
Byte 4 = 速度
Byte 5 = 力度

读状态区：0x07D0
Byte 0 = GRIPPER STATUS
bit0 = gACT，夹爪激活状态反馈
bit3 = gGTO，GoTo 状态反馈
bit4-5 = gSTA，激活/运动状态
bit6-7 = gOBJ，物体检测状态
Byte 2 = 故障状态
Byte 3 = 位置命令回显
Byte 4 = 实际位置
Byte 5 = 电流
```



1  使能 ，钧舵 ，rACT 

  Robotiq ， Byte0, rACT

2 位置 

使能 ，钧舵 ， 0x07D0 ，gGTO

  Robotiq ， Byte0, gGTO

3 位置 速度  

位置：钧舵 ， 0x07D1高字节 ，gPR

  Robotiq ， Byte3, gPR

速度： 钧舵 ，0x07D2低字节，gSP

  Robotiq ， Byte3, gPR

力（电流）  ，钧舵 ，0x07D2高字节 ，gCU

  Robotiq ，Byte5，gCU

4 故障

使能 ，钧舵 ，0x07D1低字节，

  Robotiq ， Byte2, rACT

Byte2，



位置反馈



Byte2 ， A C  D E ,四个故障灯

 0x0A-Underminimumoperatingvoltage.

 0x0C-Internal fault;contact support@robotiq.com

0x0D-Activationfault,verify that no interference or other error occurred

0x0E-Overcurrenttriggered



把力和速度改为03EA（参数设置寄存器）。





每个点位2mm以内  ，2mm/3 =0.6ms   , 0.6/ 


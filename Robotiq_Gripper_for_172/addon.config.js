/*
 * @Author: 贺炳硕 hebingshuo@jaka.com
 * @Date: 2023-08-10
 * @LastEditors: 贺炳硕 hebingshuo@jaka.com
 * @LastEditTime: 2023-12-04
 * @Description: 
 */

const AddOnConfig = window.AddOnConfig

// 定义AddOn配置对象
export const createAddOnConfig = async () => {

  // 这里可以对参数初始化
  const socket_port = await get_socket_port();
  const modbus_type = await get_modbus_type();


  // return中可以添加配置项
  return [
      {
        // 给每个配置项定义可以识别的id,在参数改变调用setParam()时传入。
        id:"AddOn_port",
        // 配置名，支持中英日多语言。
        name: { "zh-CN": "AddOn portal", "en-US": "AddOn portal","ja-JP": "AddOn portal"},
        // 配置的值
        value: AddOnConfig.portal,
        // 配置描述
        description: { "zh-CN": "AddOn当前分配的端口号，用来访问AddOn服务", 
                       "en-US": "AddOn's currently assigned port number for accessing AddOn services",
                       "ja-JP": "AddOnサービスにアクセスするためにAddOnに現在割り当てられているポート番号" 
                      },
        // 禁用编辑
        disabled:true,
        // 参数输入类型 input-输入框  select-下来菜单
        type:'input',
        // 类型为select-下来菜单时需要定义下拉菜单中的选项。
        // options:{
        //   "zh-CN":[{label:'停止',value:0},{label:'暂停',value:1}],
        //   "en-US":[{label:'Stop',value:0},{label:'Pause',value:1}],
        //   "ja-JP":[{label:'停止',value:0},{label:'と一時停止',value:1}],
        // }
      },
      {
        id:"socket_port",
        name: "Socket port",
        value: socket_port,
        description: {
                      "zh-CN": "大寰夹爪后端Socket服务端口号，为防止冲突可自定义。", 
                      "en-US": "The port number of the back-end socket service of the DH Gripper, which can be customised to prevent conflicts.",
                      "ja-JP": "DH Gripperのバックエンド・ソケット・サービスのポート番号で、競合を防ぐためにカスタマイズ可能です。" 
                    },
        // 禁用编辑
        disabled:false,
        // 参数输入类型 input-输入框  select-下来菜单
        type:'input',
      },
      {
        id:"modbus_type",
        name: "modbus type",
        value: modbus_type,
        description: {
                      "zh-CN": "请选择连接控制柜RS485还是TIO RS485。", 
                      "en-US": "Please select whether to connect the control cabinet RS485 or TIO RS485.",
                      "ja-JP": "制御盤RS485接続かTIO RS485接続かを選択してください。" 
                    },
        // 禁用编辑
        disabled:false,
        // 参数输入类型 input-输入框  select-下来菜单
        type:'select',
        // 类型为select-下来菜单时需要定义下拉菜单中的选项。
        options:{
          "zh-CN":[{label:'TIO',value:"tio"},{label:'Cabinet',value:"cab"}],
          "en-US":[{label:'TIO',value:"tio"},{label:'Cabinet',value:"cab"}],
          "ja-JP":[{label:'TIO',value:"tio"},{label:'Cabinet',value:"cab"}],
        }
      }
  ];
};

/**                           公用函数                  */

/**
 * Http post接口，方便调用,可以在config中传入url port 等配置
 * @param data:{args*}
 * @param config:{args*}
 * @returns 
 */
export function HttpRequestAPI(data,config = {}){

  const {url='',port='',method = 'post',headers = {}} = config

  return window.$addOnAxios({
      url:url,
      method:method,
      headers:headers,
      data:data
  },{port:port})
}

export const checkPasswordAndSetParam = async (passwdInput, row_id, row_value) => {
  // const re = await checkPasswdAPI(passwdInput);
  console.log("validatePassword: ", passwdInput);
  var data = {
    section: "administrator",
    key: "password",
    passwd_in: passwdInput
  }
  const result = await checkPasswdAPI(data);
  console.log("result: ", result, result.data);
  if (result.data) {
    setParam(row_id, row_value);
  }
  return true;
};

//校验管理员密码
export function checkPasswdAPI(data) {
  return window.$addOnAxios({
    url: '/jkzuc/checkPasswd',
    method: 'post',
    headers: {
      robotIp: '127.0.0.1'
    },
    data: data
  }, { port: AddOnConfig.portal })
}

// 参数设置接口，每个参数变化时都会调用该函数，需要根据id自行处理设置逻辑
export const setParam = async (id,value)=>{

  switch (id) {
    case 'socket_port':
      set_socket_port(value)
      break;
    case 'modbus_type':
      set_modbus_type(value)
      break;
    default:
      console.log(`Pass ${id}.`);
  }
}


/**                           用户自定义函数                  */


const get_socket_port = async ()=>{
    
    const re = await HttpRequestAPI({},{url:'/get/socket_port/',port:AddOnConfig.portal})
    console.log(re)
    return re.data.socket_port
}

const set_socket_port = async (value)=>{
  var data = {
    port:value,
  }
  await HttpRequestAPI(data,{url:'/set/socket_port/',port:AddOnConfig.portal})
}

const get_modbus_type = async ()=>{
    
  const re = await HttpRequestAPI({},{url:'/get/modbus_type/',port:AddOnConfig.portal})
  console.log(re)
  return re.data.modbus_type
}

const set_modbus_type = async (value)=>{
var data = {
  modbus_type:value,
}
await HttpRequestAPI(data,{url:'/set/modbus_type/',port:AddOnConfig.portal})
}

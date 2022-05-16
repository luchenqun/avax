import axios from "axios";

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: ("000" + this.getMilliseconds()).substr(-3), //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  return fmt;
};

const formatParams = (method, params) => {
  if (params) {
    if (!Array.isArray(params)) {
      params = [params];
    }
  } else {
    params = [];
  }
  let data = { method, jsonrpc: "2.0", id: parseInt(new Date().Format("hhmmss")), params };
  return data;
};

export default class RPC {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
    });
  }
  async post(method, params, async = true) {
    let data = formatParams(method, params);
    if (async) {
      let reply = await this.client.post("", data);
      return new Promise((resolve, reject) => {
        if (reply.status === 200) {
          if (reply.data.error) {
            reject(reply.data.error.code + ":" + reply.data.error.message);
          } else {
            resolve(reply.data.result);
          }
        } else {
          reject("request error");
        }
      });
    } else {
      return this.client.post("", data);
    }
  }
}

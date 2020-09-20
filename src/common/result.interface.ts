// 定义通用的API接口返回数据类型
export interface Result {
  statusCode: number;
  message?: string;
  error?: string;
  data?: any;
}

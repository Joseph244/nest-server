export enum ApiErrorCode {
  TIMEOUT = -1, // 系统繁忙
  SUCCESS = 0, // 成功

  TOKEN_ERROR = 40000, // token参数错误
  PARAMS_ERROR = 40001, // 输入参数错误
  USER_ID_INVALID = 10001, // 用户 ID 无效
  USER_NAME_INVALID = 10002, // 用户 姓名 无效
  USER_AGE_INVALID = 10003, // 用户 年龄 无效s
}

// HTTP 状态码
// 200: GET请求成功, 及DELETE或PATCH同步请求完成，或者PUT同步更新一个已存在的资源
// 201: POST 同步请求完成，或者PUT同步创建一个新的资源
// 202: POST, PUT, DELETE, 或 PATCH 请求接收，将被异步处理
// 206: GET 请求成功, 但是只返回一部分

// 使用身份认证（authentication）和授权（authorization）错误码时需要注意：
// 401 Unauthorized: 用户未认证，请求失败
// 403 Forbidden: 用户无权限访问该资源，请求失败

// 当用户请求错误时，提供合适的状态码可以提供额外的信息：
// 422 Unprocessable Entity: 请求被服务器正确解析，但是包含无效字段
// 429 Too Many Requests: 因为访问频繁，你已经被限制访问，稍后重试
// 500 Internal Server Error: 服务器错误，确认状态并报告问题

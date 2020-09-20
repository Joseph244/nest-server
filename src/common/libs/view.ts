// 只要控制器返回的是一个 View 类型，则渲染视图，否则使用默认的api解析逻辑。
export class View {
  // 视图的名称
  public name: string;
  // 要渲染的数据源
  public data: any;

  constructor(name: string, data: any = {}) {
    this.name = name;
    this.data = data;
  }
}

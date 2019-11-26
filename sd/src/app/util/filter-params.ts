export class FilterParams {

  private _name: string;
  private _operator: string;
  private _value: string;

  constructor(name: string, operator: string, value?: string) {
    this._name = name;
    this._operator = operator;
    this._value = encodeURIComponent(value);
  }


  /**
   * Getter name
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Getter operator
   * @return {string}
   */
  public get operator(): string {
    return this._operator;
  }

  /**
   * Getter value
   * @return {string}
   */
  public get value(): string {
    return this._value;
  }

  /**
   * Setter name
   * @param {string} value
   */
  public set name(value: string) {
    this._name = value;
  }

  /**
   * Setter operator
   * @param {string} value
   */
  public set operator(value: string) {
    this._operator = value;
  }

  /**
   * Setter value
   * @param {string} value
   */
  public set value(value: string) {
    this._value = encodeURIComponent(value);
  }

  public get stringify(): string {
    if (this._operator) {
      return this._name + '=' + this._operator + ':' + this._value;
    } else {
      return this._name + '=' + this._value;
    }
  }

}

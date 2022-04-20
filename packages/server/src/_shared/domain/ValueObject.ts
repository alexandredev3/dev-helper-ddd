interface IValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<T extends IValueObjectProps> {
  public props: T;

  constructor(props: T) {
    const baseProps: any = {
      ...props,
    };

    this.props = baseProps;
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.props === undefined) {
      return false;
    }

    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
}

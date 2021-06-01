import { Result } from '@shared/core/Result';
import { ValueObject } from '@shared/domain/ValueObject';

interface IUserTagsProps {
  tags: string[];
  tag: string;
}

export class UserTags extends ValueObject<IUserTagsProps> {
  get tags(): string[] {
    return this.props.tags;
  }

  get tag(): string {
    return this.props.tag;
  }

  private constructor(props: IUserTagsProps) {
    super(props);
  }

  private static isValidTags(tags: string): boolean {
    const regex = /^[a-zA-Z]*$/;

    return regex.test(tags);
  }

  private static format(tags: string[]): string {
    const tag = tags.join(',').replace(/\s/g, '');

    return tag;
  }

  public static create(props: IUserTagsProps): Result<UserTags> {
    const { tags } = props;

    const tag = this.format(tags);
    const isValidTags = this.isValidTags(tag);

    if (!isValidTags) {
      return Result.fail<UserTags>('Tags is not valid');
    }

    return Result.ok<UserTags>(
      new UserTags({
        tags,
        tag,
      })
    );
  }
}

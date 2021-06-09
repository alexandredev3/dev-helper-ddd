import { Guard } from '@shared/core/Guard';
import { Result } from '@shared/core/Result';
import { ValueObject } from '@shared/domain/ValueObject';

interface IUserTagsProps {
  tags: string[];
}

export class UserTags extends ValueObject<IUserTagsProps> {
  get tags(): string[] {
    return this.props.tags;
  }

  /**
   *
   * @returns       Returns tags, e.g: `"node, react, reactnative"`
   */
  get tagsRaw(): string {
    return this.props.tags.join(',').replace(/\s/g, '').toLowerCase();
  }

  private constructor(props: IUserTagsProps) {
    super(props);
  }

  private static isValidTags(tags: string[]): boolean {
    const regex = /^[a-zA-Z]*$/;

    for (const tag of tags) {
      const result = regex.test(tag);

      if (!result) {
        return result;
      }
    }

    return true;
  }

  private static format(tags: string[]): string[] {
    const tagsFormated = tags.map((tag) =>
      tag.replace(/\s/g, '').toLowerCase()
    );

    return tagsFormated;
  }

  private static tagsRawToArray(tagsRaw: string): string[] {
    return tagsRaw.split(',');
  }

  public static create(props: IUserTagsProps): Result<UserTags> {
    const tagResult = Guard.againstNullOrUndefined(props.tags, 'tags');

    if (!tagResult.succeeded) {
      return Result.fail<UserTags>(tagResult.message);
    }

    let { tags } = props;

    if (typeof props.tags === 'string') {
      tags = this.tagsRawToArray(props.tags);
    }

    const isValidTags = this.isValidTags(tags);

    tags = this.format(tags);

    if (!isValidTags) {
      return Result.fail<UserTags>('Tags is not valid');
    }

    return Result.ok<UserTags>(
      new UserTags({
        tags,
      })
    );
  }
}

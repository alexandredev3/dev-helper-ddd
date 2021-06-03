import { Guard } from '@shared/core/Guard';
import { Result } from '@shared/core/Result';
import { ValueObject } from '@shared/domain/ValueObject';

interface IUserTagsProps {
  tags: string[];
  inlineTags: string;
}

export class UserTags extends ValueObject<IUserTagsProps> {
  get tags(): string[] {
    return this.props.tags;
  }

  get inlineTags(): string {
    return this.props.inlineTags;
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

  private static format(tags: string[]): {
    tags: string[];
    inlineTags: string;
  } {
    const regex = /\s/g;

    const tagsFormted = tags.map((tag) => tag.replace(regex, '').toLowerCase());
    const tagFormated = tags.join(',').replace(regex, '').toLowerCase();

    return {
      tags: tagsFormted,
      inlineTags: tagFormated,
    };
  }

  /**
   *
   * @param props           `tags` e.g: `["node", "react", "reactnative"]`.
   * @returns               Returns `tags` and `inlineTags`, `tags: (Array["node", "react"])` to show in UI. `inlineTags: String("node, react")` to persist in the database.
   */
  public static create(
    props: Omit<IUserTagsProps, 'inlineTags'>
  ): Result<UserTags> {
    const tagResult = Guard.againstNullOrUndefined(props.tags, 'tags');

    if (!tagResult.succeeded) {
      return Result.fail<UserTags>(tagResult.message);
    }

    const { tags, inlineTags } = this.format(props.tags);

    const isValidTags = this.isValidTags(tags);

    if (!isValidTags) {
      return Result.fail<UserTags>('Tags is not valid');
    }

    return Result.ok<UserTags>(
      new UserTags({
        tags,
        inlineTags,
      })
    );
  }
}

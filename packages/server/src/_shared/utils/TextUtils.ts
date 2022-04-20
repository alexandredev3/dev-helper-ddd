import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!DOCTYPE html>');
const DOMPurify = createDOMPurify(window as unknown as Window);

export class TextUtils {
  public static sanitize(unsafeText: string): string {
    const safeText = DOMPurify.sanitize(unsafeText);

    return safeText;
  }

  public static validateTags(tags: string[]): boolean {
    const regex = /^[a-zA-Z]*$/;

    if (!Array.isArray(tags)) {
      return false;
    }

    for (const tag of tags) {
      const result = regex.test(tag);

      if (!result) {
        return false;
      }
    }

    return true;
  }
}

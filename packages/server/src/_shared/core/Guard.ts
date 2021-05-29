interface IGuardResult {
  succeeded: boolean;
  message?: string;
}

interface IGuardArgument {
  argument: any;
  argumentName: string;
}

type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  public static againstNullOrUndefinedBulk(
    args: GuardArgumentCollection
  ): IGuardResult {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName
      );

      if (!result.succeeded) {
        return result;
      }
    }

    return {
      succeeded: true,
    };
  }

  public static againstNullOrUndefined(
    argument: any,
    argumentName: string
  ): IGuardResult {
    if (argument === null || argument === undefined) {
      return {
        succeeded: false,
        message: `${argumentName} is ${this.nullOrUndefined(argument)}.`,
      };
    }

    return {
      succeeded: true,
    };
  }

  private static nullOrUndefined(argument: any): 'undefined' | 'null' {
    if (typeof argument === 'undefined') {
      return 'undefined';
    }

    if (!argument) {
      return 'null';
    }

    throw new Error('[InvalidOperation]: argument must be null or undefined');
  }
}

import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsFile(options: { fileTypes: string[], maxSize: number }, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isFile',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [validationOptions] = args.constraints;

          if (!value) return false;
          const fileTypes = validationOptions.fileTypes || [];
          if (!fileTypes.includes(value.mimetype)) {
            return false;
          }
          const maxSize = validationOptions.maxSize || 0;
          if (value.size > maxSize) {
            return false;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `El archivo debe ser uno de los siguientes tipos: ${args.constraints[0].fileTypes.join(
            ', ',
          )}, y no debe exceder el tamaño de ${args.constraints[0].maxSize / 1024 / 1024} MB.`;
        },
      },
    });
  };
}
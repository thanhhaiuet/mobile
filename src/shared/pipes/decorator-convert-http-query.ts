import { EDecoratorKeyConvert } from '@constants/decorator.constants';

function autoConvertDecoratorHandle(
  target: Object,
  propertyKey: string,
  key: EDecoratorKeyConvert,
) {
  const meta = Reflect.getMetadata(key, target) as string[];
  if (!meta) {
    return Reflect.defineMetadata(key, [propertyKey], target);
  }
  if (!meta.includes(propertyKey)) {
    meta.push(propertyKey);
  }
}

export function AutoConvertNumber(_target: Object) {
  return function (target: any, propertyKey: string) {
    autoConvertDecoratorHandle(
      _target,
      propertyKey,
      EDecoratorKeyConvert.NUMBER,
    );
  };
}

export function AutoConvertBoolean(_target: Object) {
  return function (target: any, propertyKey: string) {
    autoConvertDecoratorHandle(
      _target,
      propertyKey,
      EDecoratorKeyConvert.BOOLEAN,
    );
  };
}

export function AutoConvertArrayNumber(_target: Object) {
  return function (target: any, propertyKey: string) {
    autoConvertDecoratorHandle(
      _target,
      propertyKey,
      EDecoratorKeyConvert.ARRAY_NUMBER,
    );
  };
}

export function AutoConvertArrayString(_target: Object) {
  return function (target: any, propertyKey: string) {
    autoConvertDecoratorHandle(
      _target,
      propertyKey,
      EDecoratorKeyConvert.ARRAY_STRING,
    );
  };
}

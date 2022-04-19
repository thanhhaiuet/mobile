import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { EDecoratorKeyConvert } from '@constants/decorator.constants';

interface IConvertData {
  convertNumber?: string[];
  convertBoolean?: string[];
  convertArrayNumber?: string[];
  convertArrayString?: string[];
}

@Injectable()
export class ConvertHttpQueryPipe implements PipeTransform<any> {
  private readonly _mapConvert = new Map<Function, IConvertData>();

  constructor(...targetDtos: Function[]) {
    targetDtos.forEach((targetDto) => {
      this._mapConvert.set(targetDto, {
        convertNumber: Reflect.getMetadata(
          EDecoratorKeyConvert.NUMBER,
          targetDto,
        ),
        convertBoolean: Reflect.getMetadata(
          EDecoratorKeyConvert.BOOLEAN,
          targetDto,
        ),
        convertArrayNumber: Reflect.getMetadata(
          EDecoratorKeyConvert.ARRAY_NUMBER,
          targetDto,
        ),
        convertArrayString: Reflect.getMetadata(
          EDecoratorKeyConvert.ARRAY_STRING,
          targetDto,
        ),
      });
    });
  }

  async transform(value: any, { type, metatype }: ArgumentMetadata) {
    if (type === 'body' || !this._mapConvert.has(metatype)) {
      return value;
    }

    // convert
    const convertData = this._mapConvert.get(metatype);
    convertToNumber(convertData.convertNumber, value);
    convertToBoolean(convertData.convertBoolean, value);
    convertToArrayNumber(convertData.convertArrayNumber, value);
    convertToArrayString(convertData.convertArrayString, value);

    return value;
  }
}

function convertToNumber(listRequireData: string[], value: Object) {
  if (!listRequireData?.length) {
    return;
  }
  for (const key of listRequireData) {
    if (value[key] !== undefined) {
      value[key] = +value[key];
    }
  }
}

function convertToBoolean(listRequireData: string[], value: Object) {
  if (!listRequireData?.length) {
    return;
  }
  for (const key of listRequireData) {
    if (value[key] !== undefined) {
      value[key] = !!+value[key];
    }
  }
}

function convertToArrayNumber(listRequireData: string[], value: Object) {
  if (!listRequireData?.length) {
    return;
  }
  for (const key of listRequireData) {
    if (value[key] !== undefined) {
      if (typeof value[key] === 'string') {
        value[key] = [+value[key]];
        continue;
      }
      value[key] = (value[key] as any[]).map((data) => +data);
    }
  }
}

function convertToArrayString(listRequireData: string[], value: Object) {
  if (!listRequireData?.length) {
    return;
  }
  for (const key of listRequireData) {
    if (value[key] !== undefined && typeof value[key] === 'string') {
      value[key] = [value[key]];
    }
  }
}

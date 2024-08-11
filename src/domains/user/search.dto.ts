import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsOptional,
  IsString,
  registerDecorator,
  ValidateNested,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

// custom decorator validate range date
export function RangeDateValidator(
  property: ['from', 'to'],
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'rangeDateValidator',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(_: Date, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints as [['from', 'to']];
          const valueFrom = args.object[relatedPropertyName[0]];
          const valueTo = args.object[relatedPropertyName[1]];

          return valueTo > valueFrom;
        },
      },
    });
  };
}

export interface IRangeDate {
  from?: Date | undefined;
  to?: Date | undefined;
}

export interface ISort {
  description?: boolean | undefined;
  moduleNo?: boolean | undefined;
  status?: boolean | undefined;
  decidedAt?: boolean | undefined;
}

export interface ISearch {
  description?: string | undefined;
  moduleNo?: string | undefined;
  remark?: string | undefined;
  decidedAt?: IRangeDate | undefined;
}

export class RangeDateArgs {
  @IsOptional()
  @IsDate()
  @Expose()
  @RangeDateValidator(['from', 'to'])
  from?: Date;

  @IsOptional()
  @IsDate()
  @RangeDateValidator(['from', 'to'])
  @Expose()
  to?: Date;
}

export class SortArgs implements ISort {
  @IsOptional()
  @IsBoolean()
  @Expose()
  description?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  moduleNo?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  status?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  decidedAt?: boolean;
}

// Search DTO
export class SearchArgs implements ISearch {
  @IsOptional()
  @IsDefined()
  @IsString()
  @Expose()
  description?: string;

  @IsOptional()
  @IsDefined()
  @IsString()
  @Expose()
  moduleNo?: string = 'module';

  @IsOptional()
  @IsDefined()
  @IsString()
  @Expose()
  remark?: string;

  @IsOptional()
  @IsDefined()
  @Type(() => RangeDateArgs)
  @ValidateNested()
  @Expose()
  decidedAt?: RangeDateArgs;
}

export class SearchRequest {
  constructor(search: SearchArgs, sort: SortArgs) {
    this.search = search;
    this.sort = sort;
  }

  @IsOptional()
  @Type(() => SearchArgs)
  @ValidateNested()
  @Expose()
  search?: SearchArgs;

  @IsOptional()
  @Type(() => SortArgs)
  @ValidateNested()
  @Expose()
  sort?: SortArgs;
}

@Exclude()
export class SearchResponse implements Omit<ISearch, 'decidedAt'> {
  @Expose()
  description: string;

  @Expose()
  moduleNo: string;

  @Expose()
  remark: string;

  @Expose()
  @Transform((item) => item.value.toISOString(), { toPlainOnly: true })
  decidedAt: Date;

  @Expose()
  @Transform((item) => item.value.split(','), { toPlainOnly: true })
  ids: string;
}

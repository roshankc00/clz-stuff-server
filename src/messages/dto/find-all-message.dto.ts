import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export class PaginataionDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  pageSize: number;
}

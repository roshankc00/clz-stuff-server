import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBroadcastDto {
  @IsString()
  @IsNotEmpty()
  imageBase64: string;
}

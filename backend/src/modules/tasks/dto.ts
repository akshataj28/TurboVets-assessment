import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString() @MaxLength(120) title!: string;
  @IsOptional() @IsString() @MaxLength(500) description?: string;
}

export class UpdateTaskDto {
  @IsOptional() @IsString() @MaxLength(120) title?: string;
  @IsOptional() @IsString() @MaxLength(500) description?: string;
  @IsOptional() @IsBoolean() completed?: boolean;
}

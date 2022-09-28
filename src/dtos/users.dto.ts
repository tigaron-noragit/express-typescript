import { IsEmail, IsString, IsArray, IsBoolean, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class UpdateUserDto {
  @IsString()
  public _id: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public username: string;

  @IsString()
  public fullname: string;

  @IsArray()
  public role: number[];

  @IsString()
  public profilePictureURI: string;

  @IsBoolean()
  public disabled: boolean;

  @IsBoolean()
  public useSSO: boolean;

  @IsString()
  public key: string;

  @IsString()
  public secret: string;

  @IsString()
  public mobile: string;

  @IsBoolean()
  public twoFA: boolean;

  @IsDate()
  public lastActive: Date;

  @IsDate()
  public deletedAt: Date;
}

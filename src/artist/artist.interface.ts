import { IsBoolean, IsString } from 'class-validator';

export class Artist {
  @IsString()
  id?: string; // uuid v4

  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}

export class CreateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto {
  @IsString()
  name?: string;

  @IsBoolean()
  grammy?: boolean;
}

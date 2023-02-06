import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class Album {
  @IsString()
  id?: string; // uuid v4

  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist
}

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist
}

export class UpdateAlbumDto {
  @IsString()
  name?: string;

  @IsNumber()
  year?: number;

  @ValidateIf((object, value) => value !== null)
  artistId?: string | null; // refers to Artist
}

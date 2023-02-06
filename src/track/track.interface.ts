import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class Track {
  @IsString()
  id: string; // uuid v4

  @IsString()
  name: string;

  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist

  @ValidateIf((object, value) => value !== null)
  albumId: string | null; // refers to Album

  @IsNumber()
  duration: number; // integer number
}

export class CreateTrackDto {
  @IsString()
  name: string;

  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist

  @ValidateIf((object, value) => value !== null)
  albumId: string | null; // refers to Album

  @IsNumber()
  duration: number; // integer number
}

export class UpdateTrackDto {
  @IsString()
  name?: string;

  @ValidateIf((object, value) => value !== null)
  artistId?: string | null; // refers to Artist

  @ValidateIf((object, value) => value !== null)
  albumId?: string | null; // refers to Album

  @IsNumber()
  duration?: number; // integer number
}

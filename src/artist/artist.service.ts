import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { Artist, CreateArtistDto, UpdateArtistDto } from './artist.interface';
import { TrackService } from '../track/track.service';

@Injectable()
export class ArtistService {
  readonly artists: Artist[] = [];
  @Inject(TrackService)
  private trackService: TrackService;
  private validateId(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Artist id is not uuid v4 format`);
    }
  }

  getAllArtists(): Artist[] {
    return this.artists;
  }

  findArtistById(id: string): Artist {
    this.validateId(id);

    const foundArtistIndex = this.artists.findIndex((user) => user.id === id);

    if (foundArtistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found.`);
    }

    return this.artists[foundArtistIndex];
  }

  createArtist(Artist: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      name: Artist.name,
      grammy: Artist.grammy,
    };

    this.artists.push(newArtist);

    return newArtist;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto): Artist {
    this.validateId(id);

    const foundArtistIndex = this.artists.findIndex((user) => user.id === id);

    if (foundArtistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found.`);
    }

    const foundArtist = this.artists[foundArtistIndex];

    if (updateArtistDto.name) {
      foundArtist.name = updateArtistDto.name;
    }

    if (updateArtistDto.hasOwnProperty('grammy')) {
      foundArtist.grammy = updateArtistDto.grammy;
    }

    this.artists[foundArtistIndex] = foundArtist;

    return this.artists[foundArtistIndex];
  }

  removeArtist(id: string) {
    this.validateId(id);

    const foundArtistIndex = this.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (foundArtistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found.`);
    }

    this.artists.splice(foundArtistIndex, 1);

    this.trackService.tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });
  }
}

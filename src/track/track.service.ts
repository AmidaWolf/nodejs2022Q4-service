import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto, Track, UpdateTrackDto } from './track.interface';
import { isUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  readonly tracks: Track[] = [];

  private validateId(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Track id is not uuid v4 format`);
    }
  }

  getAllTracks(): Track[] {
    return this.tracks;
  }

  findTrackById(id: string): Track {
    this.validateId(id);

    const foundTrackIndex = this.tracks.findIndex((user) => user.id === id);

    if (foundTrackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found.`);
    }

    return this.tracks[foundTrackIndex];
  }

  createTrack(track: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      name: track.name,
      artistId: track.artistId,
      albumId: track.albumId,
      duration: track.duration,
    };

    this.tracks.push(newTrack);

    return newTrack;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto): Track {
    this.validateId(id);

    const foundTrackIndex = this.tracks.findIndex((user) => user.id === id);

    if (foundTrackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found.`);
    }

    const foundTrack = this.tracks[foundTrackIndex];

    if (updateTrackDto.albumId) {
      foundTrack.albumId = updateTrackDto.albumId;
    }

    if (updateTrackDto.name) {
      foundTrack.name = updateTrackDto.name;
    }

    if (updateTrackDto.artistId) {
      foundTrack.artistId = updateTrackDto.artistId;
    }

    if (updateTrackDto.duration) {
      foundTrack.duration = updateTrackDto.duration;
    }

    this.tracks[foundTrackIndex] = foundTrack;

    return this.tracks[foundTrackIndex];
  }

  removeTrack(id: string) {
    this.validateId(id);

    const foundTrackIndex = this.tracks.findIndex((track) => track.id === id);

    if (foundTrackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found.`);
    }

    this.tracks.splice(foundTrackIndex, 1);
  }
}

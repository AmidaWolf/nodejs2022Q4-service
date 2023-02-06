import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { isUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { Album, CreateAlbumDto, UpdateAlbumDto } from './album.interface';

@Injectable()
export class AlbumService {
  readonly albums: Album[] = [];
  @Inject(TrackService)
  private trackService: TrackService;
  private validateId(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Album id is not uuid v4 format`);
    }
  }

  getAllAlbums(): Album[] {
    return this.albums;
  }

  findAlbumById(id: string): Album {
    this.validateId(id);

    const foundAlbumIndex = this.albums.findIndex((user) => user.id === id);

    if (foundAlbumIndex === -1) {
      throw new NotFoundException(`Album with id ${id} not found.`);
    }

    return this.albums[foundAlbumIndex];
  }

  createAlbum(album: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };

    this.albums.push(newAlbum);

    return newAlbum;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    this.validateId(id);

    const foundAlbumIndex = this.albums.findIndex((user) => user.id === id);

    if (foundAlbumIndex === -1) {
      throw new NotFoundException(`Album with id ${id} not found.`);
    }

    const foundAlbum = this.albums[foundAlbumIndex];

    if (updateAlbumDto.name) {
      foundAlbum.name = updateAlbumDto.name;
    }

    if (updateAlbumDto.year) {
      foundAlbum.year = updateAlbumDto.year;
    }

    if (updateAlbumDto.artistId) {
      foundAlbum.artistId = updateAlbumDto.artistId;
    }

    this.albums[foundAlbumIndex] = foundAlbum;

    return this.albums[foundAlbumIndex];
  }

  removeAlbum(id: string) {
    this.validateId(id);

    const foundAlbumIndex = this.albums.findIndex((Album) => Album.id === id);

    if (foundAlbumIndex === -1) {
      throw new NotFoundException(`Album with id ${id} not found.`);
    }

    this.albums.splice(foundAlbumIndex, 1);

    console.log(this.trackService.tracks);

    this.trackService.tracks.forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });
  }
}

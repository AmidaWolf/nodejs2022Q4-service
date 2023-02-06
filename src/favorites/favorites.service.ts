import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { Favorites, FavoritesResponse } from './favorites.interface';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class FavoritesService {
  @Inject(TrackService)
  private trackService: TrackService;
  @Inject(AlbumService)
  private albumService: AlbumService;
  @Inject(ArtistService)
  private artistService: ArtistService;

  readonly favs: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  private validateId(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Album id is not uuid v4 format`);
    }
  }

  getAllFavs(): FavoritesResponse {
    const artists = [];
    const albums = [];
    const tracks = [];

    if (this.favs.artists.length !== 0) {
      this.favs.artists.forEach((artistId) => {
        artists.push(
          this.artistService.artists.find((artist) => artist.id === artistId),
        );
      });
    }

    if (this.favs.albums.length !== 0) {
      this.favs.albums.forEach((albumId) => {
        albums.push(
          this.albumService.albums.find((album) => album.id === albumId),
        );
      });
    }

    if (this.favs.tracks.length !== 0) {
      this.favs.tracks.forEach((trackId) => {
        tracks.push(
          this.trackService.tracks.find((track) => track.id === trackId),
        );
      });
    }

    return {
      artists: artists,
      albums: albums,
      tracks: tracks,
    };
  }

  addTrackToFavs(id: string) {
    this.validateId(id);

    const foundTracksIndex = this.trackService.tracks.findIndex(
      (track) => track.id === id,
    );

    if (foundTracksIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found.`);
    }

    const foundFavsIndex = this.favs.tracks.findIndex(
      (trackId) => trackId === id,
    );

    if (foundFavsIndex !== -1) {
      this.favs.tracks.push(id);
    }
  }

  removeTrackFromFavs(id: string) {
    this.validateId(id);

    const foundTracksIndex = this.favs.tracks.findIndex(
      (trackId) => trackId === id,
    );

    if (foundTracksIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found.`);
    }

    this.favs.tracks.splice(foundTracksIndex, 1);
  }

  addAlbumToFavs(id: string) {
    this.validateId(id);

    const foundAlbumsIndex = this.albumService.albums.findIndex(
      (album) => album.id === id,
    );

    if (foundAlbumsIndex === -1) {
      throw new NotFoundException(`Album with id ${id} not found.`);
    }

    const foundFavsIndex = this.favs.albums.findIndex(
      (trackId) => trackId === id,
    );

    if (foundFavsIndex !== -1) {
      this.favs.albums.push(id);
    }
  }

  removeAlbumFromFavs(id: string) {
    this.validateId(id);

    const foundAlbumsIndex = this.favs.albums.findIndex(
      (albumId) => albumId === id,
    );

    if (foundAlbumsIndex === -1) {
      throw new NotFoundException(`Album with id ${id} not found.`);
    }

    this.favs.albums.splice(foundAlbumsIndex, 1);
  }

  addArtistToFavs(id: string) {
    this.validateId(id);

    const foundArtistIndex = this.artistService.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (foundArtistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found.`);
    }

    const foundFavsIndex = this.favs.artists.findIndex(
      (trackId) => trackId === id,
    );

    if (foundFavsIndex !== -1) {
      this.favs.artists.push(id);
    }
  }

  removeArtistFromFavs(id: string) {
    this.validateId(id);

    const foundArtistIndex = this.favs.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (foundArtistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found.`);
    }

    this.favs.artists.splice(foundArtistIndex, 1);
  }
}

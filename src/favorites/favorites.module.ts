import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TrackController } from '../track/track.controller';
import { ArtistController } from '../artist/artist.controller';
import { AlbumController } from '../album/album.controller';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';

@Module({
  controllers: [
    FavoritesController,
    TrackController,
    ArtistController,
    AlbumController,
  ],
  providers: [FavoritesService, TrackService, ArtistService, AlbumService],
})
export class FavoritesModule {}

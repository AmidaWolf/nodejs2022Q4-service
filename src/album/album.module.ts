import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackController } from '../track/track.controller';
import { TrackService } from '../track/track.service';

@Module({
  controllers: [AlbumController, TrackController],
  providers: [AlbumService, TrackService],
})
export class AlbumModule {}

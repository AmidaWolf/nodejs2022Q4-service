import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TrackController } from '../track/track.controller';
import { TrackService } from '../track/track.service';

@Module({
  controllers: [ArtistController, TrackController],
  providers: [ArtistService, TrackService],
})
export class ArtistModule {}

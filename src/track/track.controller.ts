import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto, Track, UpdateTrackDto } from './track.interface';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get('')
  findAllTracks(): Track[] {
    return this.trackService.getAllTracks();
  }

  @Get('/:id')
  findTrackById(@Param() params: Record<string, string>): Track {
    return this.trackService.findTrackById(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  createTrack(@Body() createTrackDto: CreateTrackDto): Track {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    return this.trackService.removeTrack(id);
  }
}

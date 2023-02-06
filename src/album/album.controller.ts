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
import { AlbumService } from './album.service';
import { Album, CreateAlbumDto, UpdateAlbumDto } from './album.interface';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get('')
  findAllAlbums(): Album[] {
    return this.albumService.getAllAlbums();
  }

  @Get('/:id')
  findAlbumById(@Param() params: Record<string, string>): Album {
    return this.albumService.findAlbumById(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): Album {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Album {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    return this.albumService.removeAlbum(id);
  }
}

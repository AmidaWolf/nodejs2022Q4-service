import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './favorites.interface';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get('')
  getAllFavs(): FavoritesResponse {
    return this.favoritesService.getAllFavs();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavs(@Param('id') id: string) {
    return this.favoritesService.addTrackToFavs(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavs(@Param('id') id: string) {
    return this.favoritesService.removeTrackFromFavs(id);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavs(@Param('id') id: string) {
    return this.favoritesService.addAlbumToFavs(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavs(@Param('id') id: string) {
    return this.favoritesService.removeAlbumFromFavs(id);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavs(@Param('id') id: string) {
    return this.favoritesService.addArtistToFavs(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavs(@Param('id') id: string) {
    return this.favoritesService.removeArtistFromFavs(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from '../belt/belt.guard';
import { SkipAuth } from '../auth/decorators/skipAuth.decorator';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  // GET/ ninjas?weapon=? --> [] (get All Ninjas)
  // Add skipAuth decorator to skip auth guard
  // @SkipAuth()
  @Get()
  getNinjas(@Query('weapon') weapon: 'Kunai' | 'nunchuks') {
    return this.ninjasService.getNinjas(weapon);
  }

  // GET/ ninjas/:id --> {} (get a Ninja by id)
  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getOneNinja(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  // POST/ ninjas --> {body} (create a Ninja)
  @Post()
  @UseGuards(BeltGuard)
  @UsePipes(new ValidationPipe())
  createNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  // PUT/ ninjas/:id --> {body} (update a Ninja by id)
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.updateNinja(+id, updateNinjaDto);
  }

  // DELETE/ ninjas/:id  (delete a Ninja by id)
  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return this.ninjasService.deleteNinja(+id);
  }
}

import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {CreateNinjaDto} from "./dto/create-ninja.dto";
import {UpdateNinjaDto} from "./dto/update-ninja.dto";

@Controller('ninjas')
export class NinjasController {
    // GET/ ninjas?type=fast --> [] (get All Ninjas)
    @Get()
    getNinjas(@Query('type') type: string) {
        if (type) {
            return [`All ${type} Ninjas`];
        }
        return ['All Ninjas'];
    }

    // GET/ ninjas/:id --> {} (get a Ninja by id)
    @Get(':id')
    getOneNinja(@Param('id') id: string) {
        return {
            id,
        };
    }

    // POST/ ninjas --> {body} (create a Ninja)
    @Post()
    createNinja(@Body() createNinjaDto: CreateNinjaDto) {
        return {
            name : createNinjaDto.name,
        };
    }

    // PUT/ ninjas/:id --> {body} (update a Ninja by id)
    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
        return {
            id,
            name: updateNinjaDto.name,
        };
    }

    // DELETE/ ninjas/:id  (delete a Ninja by id)
    @Delete(':id')
    deleteNinja(@Param('id') id: string) {
        return {};
    }


}

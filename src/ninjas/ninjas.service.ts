import { Injectable } from '@nestjs/common';
import {CreateNinjaDto} from "./dto/create-ninja.dto";
import {UpdateNinjaDto} from "./dto/update-ninja.dto";

@Injectable()
export class NinjasService {
    private ninjas:CreateNinjaDto[] = [
        {id: 0 , name: 'Naruto', weapon: 'Kunai'},
        {id: 1 , name: 'Sasuke', weapon: 'nunchuks'},
    ]

    getNinjas( weapon?: 'Kunai' | 'nunchuks') {
        if (weapon) {
            return this.ninjas.filter(ninja => ninja.weapon === weapon);
        }
        return this.ninjas;
    }
    getOneNinja(id: number) {
        const ninja = this.ninjas.find(ninja => ninja.id === +id);
        if(!ninja) {
            throw new Error('Ninja not found');
        }
        return ninja;
    }

    createNinja(createNinjaDto: CreateNinjaDto) {
        const newNinja = {
            ...createNinjaDto,
            id: Date.now()
        };
        this.ninjas.push(newNinja);
        return newNinja;
    }

    updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
        this.ninjas = this.ninjas.map(ninja => {
            if(ninja.id === +id) {
                return {
                    ...ninja,
                    ...updateNinjaDto
                }
            }
            return ninja;
        });
        return this.getOneNinja(id);
    }

    deleteNinja(id: number) {
        const ninjaToDelete = this.getOneNinja(id);
        this.ninjas = this.ninjas.filter(ninja => ninja !== ninjaToDelete);
        return ninjaToDelete;
    }
}

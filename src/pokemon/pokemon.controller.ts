import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { PokemonService } from './pokemon.service';
import { PokemonEntity } from './pokemon.entity';
import { LogInterceptor } from '../log.interceptor';

@UseInterceptors(LogInterceptor)
// crud自动注解
@Crud({
  model: {
    type: PokemonEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
// @CRUD automatically sets up the following endpoints:

// GET /pokemon Get all

// GET /pokemon/:id Get one by id

// POST /pokemon Add one

// POST /pokemon/bulk Add many
// 参数为：{
// 	"bulk":[
//     {
//         "name": "qjq1",
//         "type": "d1",
//         "pokedex": 1
//     },
//     {
//         "name": "qjq2",
//         "type": "d2",
//         "pokedex": 2
//     }
// ]
// }
// PUT /pokemon/:id Replace one
// PATCH /pokemon/:id Update one
// DELETE /pokemon/:id Delete one

@Controller('pokemon')
export class PokemonController {
  constructor(public service: PokemonService) {}
}

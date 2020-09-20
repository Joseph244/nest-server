import { Controller, UseInterceptors } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { Crud, CrudController } from '@nestjsx/crud';
import { LogInterceptor } from '../log.interceptor';

@UseInterceptors(LogInterceptor)
// crud自动注解
@Crud({
  model: {
    type: Role,
  },
})
@Controller('role')
export class RoleController implements CrudController<Role> {
  constructor(public service: RoleService) {}
}
// @CRUD automatically sets up the following endpoints:

// GET /role Get all

// GET /role/:id Get one by id

// POST /role Add one

// POST /role/bulk Add many
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
// PUT /role/:id Replace one
// PATCH /role/:id Update one
// DELETE /role/:id Delete one

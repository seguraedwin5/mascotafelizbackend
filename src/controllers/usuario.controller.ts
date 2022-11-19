import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import axios from 'axios';
import {LLaves} from '../config/llaves';
import {Credencial, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {AutenticacionService} from '../services';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,

    @service(AutenticacionService)
    public autenticacionservice: AutenticacionService
  ) { }

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    let clave = this.autenticacionservice.GenerarPassword();
    let clavecifrada = this.autenticacionservice.CifrarPassword(clave)
    usuario.password = clavecifrada;
    let u = await this.usuarioRepository.create(usuario);

    //notificar correo
    let receivermail = usuario.correo;
    let subject = 'Usuario Registrado: Mascota Feliz';
    let content = `
    <div style="container-type:inline-size">
      <h1>Bienvenido!! ${usuario.nombre} ${usuario.apellido} </h1></br>
      <div>
        <h2>Aqui estan tus credenciales de acceso a mascota feliz</h2>
      </div>
      <div>
        <h3 style="color:blue">Usuario: <span style="color:black" >${usuario.correo}</span><h3></br>
        <h3 style="color:blue">Password: <span style="color:black" >${clave}</span><h3></br>
      </div>
    </div>`;
    axios.get(`${LLaves.urlServicioNotificaciones}/mail?receivermail=${receivermail}&subject=${subject}&content=${content}`)
      .then((response: any) => {
        console.log(response.data);
      });

    return u;
  }

  @post('/loginusuario', {
    responses: {
      '200': {
        description: 'Identificacion de  persona'
      }
    }
  })
  async LoginUsuario(
    @requestBody() credenciales: Credencial
  ) {
    let u = await this.autenticacionservice.IdentificarUsuario(credenciales.usuario, credenciales.password);
    if (u) {
      let token = this.autenticacionservice.GenerarToken(u)
      return {
        datos: {
          nombre: `${u.nombre} ${u.apellido}`,
          correo: u.correo,
          id: u.id,
          rol: u.rol,
        },
        accesstoken: token
      };
    } else {
      throw new HttpErrors[401]('El usuario no existe')
    }
  };


  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}

import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {LLaves} from '../config/llaves';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
const generador = require('password-generator');
const encriptar = require('crypto-js');
const jwt = require('jsonwebtoken');


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) { }

  /**
   * genera un password de 10 digitos
   */
  GenerarPassword(): string {
    let password = generador(10, false);
    return password;
  };

  //cifrar contraseña
  CifrarPassword(password: string) {
    let passwordcifrado = encriptar.SHA256(password).toString();
    return passwordcifrado;
  };

  //Identificar Usuario
  IdentificarUsuario(usuario: string, password: string) {
    try {
      let user = this.usuarioRepository.findOne({
        where: {
          correo: usuario,
          password: password,
        }
      });

      if (user) {
        return user;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  //método para generar token
  GenerarToken(usuario: Usuario) {
    let token = jwt.sign({
      data: {
        id: usuario.id,
        correo: usuario.correo,
        nombre: `${usuario.nombre} ${usuario.apellido}`,
        rol: `${usuario.rol}`,
      }
    }, LLaves.claveJwt, {expiresIn: '1h'});

    return token;
  };

  //verificar el token
  ValidarToken(token: string) {
    try {

      let datos = jwt.verify(token, LLaves.claveJwt);
      return datos;

    } catch (error) {
      console.log('token invalido o expirado');
      return false;
    }
  };

}

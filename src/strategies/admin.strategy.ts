import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';

export class AdminStrategy implements AuthenticationStrategy {

  constructor(
    @service(AutenticacionService)
    public authservice: AutenticacionService
  ) {

  }
  //se define el nombre del rol o estragegia
  name: string = 'admin';


  /**
   *
   * @param request
   * lee el token de la solicitud y devuelve un Perfil usuario creado
   *  a partir de el token enviado
   */
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = await parseBearerToken(request);
    if (!token) {
      throw new HttpErrors[401]('No se encuentra un token en la solicitud')
    };

    let data = await this.authservice.ValidarToken(token);
    if (!data) {
      throw new HttpErrors[401]("El token no es valido");
    }

    if (data.data.rol == 'admin') {
      let perfilAdmin: UserProfile = Object.assign({
        infoperfil: {
          nombre: data.data.nombre,
          correo: data.data.correo,
          rol: data.data.rol
        }
      });
      return perfilAdmin;
    } else {
      throw new HttpErrors[401]("El usuario no tiene un rol autorizado para esta funcionalidad")
    }



  }

}

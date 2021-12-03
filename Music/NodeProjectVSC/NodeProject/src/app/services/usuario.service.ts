import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = "http://localhost:4000/api/usuarios/"

  constructor(private http: HttpClient) { }
  getusuarios(): Observable <any>{
    return this.http.get(this.url)
  }
  eliminarUsuarios(id:String): Observable <any>{
    return this.http.delete(this.url + id);
  }
  guardarUsuarios(usuarios:Usuarios): Observable <any>{
    return this.http.post(this.url, usuarios);
  }
  obtenerUsuario(id:String): Observable <any>{
    return this.http.get(this.url + id);
  }
  editarUsuario(id:String, usuario: Usuarios): Observable <any>{
    return this.http.put(this.url + id, usuario)
  }
}
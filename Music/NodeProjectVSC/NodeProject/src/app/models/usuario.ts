export class Usuarios {
_id?: Number;
Username: string;
id_documento: Number;
ciudad: string;
contrasena: string;
direccion: string;
telefono: string;
email: string;

constructor(Username:string,id_documento:Number,ciudad:string,contrasena:string,direccion:string,telefono:string,email:string){
    this.Username = Username;
    this.id_documento = id_documento;
    this.ciudad = ciudad;
    this.contrasena = contrasena;
    this.direccion = direccion;
    this.telefono = telefono;
    this.email = email;
}} 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuarios } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  usuarioForm: FormGroup;
  titulo = 'Crear Usuario';
  id:String | null;

  constructor(private fb: FormBuilder, 
    private router: Router,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService,
    private aRouter: ActivatedRoute) {

    this.usuarioForm = this.fb.group({
      Username:['',Validators.required],
      id_documento:['',Validators.required],
      ciudad:['',Validators.required],
      contrasena:['',Validators.required],
      direccion:['',Validators.required],
      telefono:['',Validators.required],
      email:['',Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }
  

  ngOnInit(): void {
    this.enEditar();
  }
  agregarUsuario(){

    const USUARIOS: Usuarios ={
      Username: this.usuarioForm.get('Username')?.value, 
      id_documento: this.usuarioForm.get('id_documento')?.value, 
      ciudad: this.usuarioForm.get('ciudad')?.value, 
      contrasena: this.usuarioForm.get('contrasena')?.value, 
      direccion: this.usuarioForm.get('direccion')?.value, 
      telefono: this.usuarioForm.get('telefono')?.value, 
      email: this.usuarioForm.get('email')?.value,
    }

    if(this.id !== null){
      // Editar usuario
      this._usuarioService.editarUsuario(this.id, USUARIOS).subscribe(data =>{
        this.toastr.success('Usuario ha sido modificado con exito', 'Usuario actualizado');
        this.router.navigate(['/']);
      }, error =>{
        console.log(error)
        this.usuarioForm.reset()
      })
    }else{
      // Agregar usuario     
    console.log(USUARIOS);
    this._usuarioService.guardarUsuarios(USUARIOS).subscribe(data =>{
      this.toastr.success('Usuario ha sido agregado con exito', 'Usuario registrado');
      this.router.navigate(['/']);
    }, error =>{
      console.log(error)
      this.usuarioForm.reset()
    })
    }
  }
  enEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Usuario';
      this._usuarioService.obtenerUsuario(this.id).subscribe(data =>{
        this.usuarioForm.setValue({
          Username: data.Username,
          id_documento: data.id_documento,
          ciudad: data.ciudad,
          contrasena: data.contrasena,
          direccion: data.direccion,
          telefono: data.telefono,
          email: data.email,
        })
      })
    }
  }
}
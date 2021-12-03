import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {
  listUsuarios: Usuarios[] = [];

  constructor(private _usuarioService: UsuarioService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerusuarios();
  }
  obtenerusuarios(){
    this._usuarioService.getusuarios().subscribe(data => {
      console.log(data);
      this.listUsuarios = data;
    }, error => {
      console.log(error)
    })
  }
  eliminarUsuario(id: any){
    this._usuarioService.eliminarUsuarios(id).subscribe(data => {
    this.toastr.error("Este usuario fue eliminado", "Usuario eliminado")
    this.obtenerusuarios();
    }, error => {
      console.log(error)
    })
  }
}
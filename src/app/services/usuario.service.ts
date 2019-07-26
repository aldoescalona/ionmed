import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Credencial } from '../model/clases';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private HORAS: number = 2000;
  private token: string;

  public pullProds = true;
  public pullMovs = true;

  constructor(private http: HttpClient, private storage: Storage, private platform: Platform) {
  }

  login(id: Credencial) {

    console.log(id);

    const url = `${environment.API_URL}/auth/login`;

    console.log(url);

    return this.http.post(url, id).pipe(
      tap((res: any) => {
        this.token = res.token;
        // localStorage.setItem('malfa.token', this.token);
        this.guardarToken(this.token);
      }, (err: HttpErrorResponse ) => {
        if (err.status === 403) { // Forbbiden
          console.log('Remover TOKEN');
          this.token = null;
          this.storage.clear();
        }
      })
    );
  }

  logout() {
    this.storage.remove('malfa.token');
    this.token = null;
    navigator['app'].exitApp();
  }

  renovarToken() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token
    });

    const url = `${environment.API_URL}/auth/renovar`;
    return this.http.post(url, '', { headers: reqHeader });
  }

  usuarioFirmado() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token
    });

    const url = `${environment.API_URL}/usuario/id`;
    return this.http.get(url, { headers: reqHeader });
  }


  async healthCkeck() {


    // console.log(this.token);
    await this.cargarToken();
    console.log('Validando healthCkeck', this.token);

    if (this.token === null || this.token.length < 5) {
      return false;
    }

    const payload = JSON.parse(atob(this.token.split('.')[1]));

    const tokenExp = new Date(payload.exp * 1000);

    const ahora = new Date();

    if (tokenExp.getTime() < ahora.getTime()) {
      this.storage.remove('malfa.token');
      return false;
    }

    ahora.setTime(ahora.getTime() + (this.HORAS * 60 * 60 * 1000));

    if (tokenExp.getTime() < ahora.getTime()) {
      this.renovarToken().subscribe((res: any) => {
        this.token = res.token;
        this.guardarToken(this.token);
      }, (err: HttpErrorResponse ) => {
        this.token = null;
        if (err.status === 403) {
          this.logout();
          return false;
        }
      });
    }
    return true;
  }


  async guardarToken( token: string ) {

    this.token = token;
    await this.storage.set('malfa.token', token);
  }

  getToken() {
    return this.token;
  }

  async cargarToken() {
    this.token = await this.storage.get('malfa.token') || null;
    return this.token;
  }

}

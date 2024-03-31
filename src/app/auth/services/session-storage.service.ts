import { Inject, Injectable } from '@angular/core';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key
// Add your code here

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  setToken(token: string){
    // Add your code here
    sessionStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    // Add your code here
    return sessionStorage.getItem(TOKEN);
  }

  deleteToken(){
    // Add your code here
    sessionStorage.removeItem(TOKEN);
  }
}

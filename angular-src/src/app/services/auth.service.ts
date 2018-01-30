import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.post("http://localhost:3000/users/register", user, { headers: headers }).map(function (res) {
      return res.json();
    });
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.post("http://localhost:3000/users/authenticate", user, { headers: headers }).map(function (res) {
      return res.json();
    });
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append("Authorization", this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http.get("http://localhost:3000/users/profile", { headers: headers }).map(function (res) {
      return res.json();
    });
  }

  storeUserData(user, token) {
    // local storage can only store strings
    localStorage.setItem("user", JSON.stringify(user));
    // this is JWT's default
    localStorage.setItem("id_token", token);
    this.user = user;
    this.authToken = token;
  }

  loadToken() {
    this.authToken = localStorage.getItem("id_token");
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

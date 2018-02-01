import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {
  user: Object;
  delay: Number = 1000;
  latitude: Number;
  longitude: Number;
  message: String = "Loading...";
  canRecord: Boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.getLocation();
      setInterval(() => {
        let location = {
          latitude: this.latitude,
          longitude: this.longitude,
          username: localStorage.getItem("username")
        }
        this.authService.recordLocation(location).subscribe();
      }, this.delay);
    },
      err => {
        console.log(err);
        return false;
      });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      }, error => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            this.message = "User denied the request for Geolocation"
            break;
          case error.POSITION_UNAVAILABLE:
            this.message = "Location information is unavailable"
            break;
          case error.TIMEOUT:
            this.message = "The request to get user location timed out"
            break;
          default:
            this.message = "An unknown error occurred"
            break;
        }
      });
      this.message = "Recording position...";
      this.canRecord = true;
    } else {
      this.message = "Geolocation is not supported by this browser";
      this.canRecord = false;
    }
  }

}

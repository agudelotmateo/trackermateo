import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  location: Object;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getLocation().subscribe(location => {
      this.location = location.location;
      console.log(this.location);
    },
      err => {
        console.log(err);
        return false;
      });
  }
}

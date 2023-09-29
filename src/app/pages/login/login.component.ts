import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor() { }

  ngOnInit(): void {
    this.slides[0] = { src: '/assets/img/login-img1.jpg', };
    this.slides[1] = { src: '/assets/img/login-img2.jpg', };
    this.slides[2] = { src: '/assets/img/login-img3.jpg', };
  }
}

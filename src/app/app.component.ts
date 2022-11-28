import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'bloodlevel';

  constructor(){}

  ngOnInit(): void {
  }
}


/*
const ROUTES = [
        ("Oral"), ("Insufflated", "Insufflated"), ("Vaporized", "Vaporized"),
        ("Sublingual", "Sublingual"), ("Rectal", "Rectal"), ("Intravenous", "Intravenous")
    ]
    */


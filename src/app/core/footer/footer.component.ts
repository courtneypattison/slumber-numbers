import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cst-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  creator = 'Courtney Pattison';
  currentYear = 2018;
  licenseURL = 'https://github.com/courtneypattison/child-sleep-tracker/blob/master/LICENSE';
  licenseName = 'MIT';
}

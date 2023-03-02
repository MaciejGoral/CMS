import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private pageService: PagesService) { }
  sections:string[]=[];

  ngOnInit(): void {
    this.pageService.getColor().subscribe((data) => {
      document.body.style.backgroundColor = data.background;
    });
    this.pageService.getSections("Front").subscribe((data)=>{
      data.sort((a:any,b:any)=>a.page_position-b.page_position);
      this.sections=data.map((section:any)=>section.html_content);
    }
    );
  }

}

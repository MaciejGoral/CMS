import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';

class page {
  name: string = '';
  address: string = '';
  menu_position: number = 0;
  created_at: string = '';
  last_modified: string = '';
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private pagesService: PagesService) { }
  menuItems:page[]=[]

  ngOnInit(): void {
    this.pagesService.getAllPages().subscribe((data)=>{
      //get all pages with menu_position>0 then sort by menu_position
      this.menuItems=data.filter((page:page)=>page.menu_position>0).sort((a:page,b:page)=>a.menu_position-b.menu_position);
    }
    );
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from 'src/app/services/pages.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-subpage',
  templateUrl: './subpage.component.html',
  styleUrls: ['./subpage.component.scss']
})
export class SubpageComponent implements OnInit {

  subpage: string="";
  constructor(private route: ActivatedRoute,private pageService: PagesService, private sanitizer: DomSanitizer) { }
  sections:string[]=[];
  SafeSections:SafeHtml[]=[];
  ngOnInit(): void {
    this.subpage = this.route.snapshot.paramMap.get('subpage')||"";
    this.pageService.getPageByAddress(this.subpage).subscribe((data)=>{
      let name=data[0].name;
      console.log(name);
      this.pageService.getSections(name).subscribe((data)=>{
        data.sort((a:any,b:any)=>a.page_position-b.page_position);
        this.sections=data.map((section:any)=>section.html_content);
        console.log(this.sections);
        this.SafeSections = this.sections.map(section => {
          return this.sanitizer.bypassSecurityTrustHtml(section);
        });
      }
      );
    });
    this.pageService.getColor().subscribe((data)=>{
      document.body.style.backgroundColor=data.background;
    });

  }

  ckeditorContent
}

import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ViewChild } from '@angular/core';

class section {
  id: number = 0;
  name: string = '';
  html_content: string = '';
  page_position: number = 0;
  page: string = '';
}
class page {
  name: string = '';
  address: string = '';
  menu_position: number = 0;
  created_at: string = '';
  last_modified: string = '';
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @ViewChild('editSection', { static: false }) editSection!: ModalDirective;
  @ViewChild('editPage', { static: false }) editPage!: ModalDirective;
  constructor(private pageService: PagesService) {}
  option: string = 'menu';
  items: any[] = ['Strona1', 'Strona2', 'Strona3'];
  ckeditorContent;
  ckeditorContentChange;
  SectionName: string = '';
  sections: section[] = [];
  selectedSectionId: number = 0;
  PageName: string = '';
  PageAddress: string = '';
  pages: page[] = [];
  curPageSections: section[] = [];
  unusedSections: section[] = [];
  dropdownSelectedSection: number = 0;
  color:string="#ffffff";
  pagesInMenu: page[] = [];
  pageNotInMenu: page[] = [];
  dropdownSelectedPage: string = '';
  addPageSuccess: boolean = false;
  addSectionSuccess: boolean = false;

  ngOnInit(): void {
    this.pageService.getAllSections().subscribe((data) => {
      this.sections = data;
    });
    this.pageService.getAllPages().subscribe((data) => {
      this.pages = data;
    });
    this.pageService.getColor().subscribe((data) => {
      this.color = data.background;
    }
    );
    this.pageService.getAllPages().subscribe((data) => {
      this.pagesInMenu = data.filter((page: any) => page.menu_position > 0).sort((a: any, b: any) => a.menu_position - b.menu_position);
      this.pageNotInMenu = data.filter((page: any) => page.menu_position == 0);
    }
    );
  }

  deleteItem(item: any) {
    this.items = this.items.filter((i) => i !== item);
  }
  addItem() {}
  changeOption(option: string) {
    this.option = option;
  }
  addSection() {
    this.addSectionSuccess = false;
    this.pageService
      .addSection({
        html_content: this.ckeditorContent,
        name: this.SectionName,
      })
      .subscribe((data) => {
        this.addSectionSuccess = true;
        this.pageService.getAllSections().subscribe((data) => {
          this.sections = data;
        }
        );
      });
  }
  hideEditSection() {
    this.editSection.hide();
  }
  showEditSection(html_content: string, id: number) {
    this.editSection.show();
    this.ckeditorContentChange = html_content;
    this.selectedSectionId = id;
  }
  editSectionContent() {
    this.pageService
      .updateSectionHtml(this.selectedSectionId, this.ckeditorContentChange)
      .subscribe((data) => {
        this.pageService.getAllSections().subscribe((data) => {
          this.sections = data;
          console.log
        });
      });
    this.hideEditSection();
  }
  deleteSection(id: number) {
    this.pageService.deleteSection(id).subscribe((data) => {
      this.pageService.getAllSections().subscribe((data) => {
        this.sections = data;
      });
    });
  }
  addPage() {
    this.addPageSuccess = false;
    this.pageService
      .addPage({ name: this.PageName, address: this.PageAddress, website: 1 })
      .subscribe((data) => {
        this.addPageSuccess = true;
        this.pageService.getAllPages().subscribe((data) => {
          this.pages = data;
          this.pagesInMenu = data.filter((page: any) => page.menu_position > 0).sort((a: any, b: any) => a.menu_position - b.menu_position);
          this.pageNotInMenu = data.filter((page: any) => page.menu_position == 0);
        }
        );
      });
  }
  deletePage(name: string) {
    this.pageService.deletePage(name).subscribe((data) => {
      this.pageService.getAllPages().subscribe((data) => {
        this.pages = data;
        this.pagesInMenu = data.filter((page: any) => page.menu_position > 0).sort((a: any, b: any) => a.menu_position - b.menu_position);
        this.pageNotInMenu = data.filter((page: any) => page.menu_position == 0);
      });
    });
  }
  showEditPage(name: string, address: string) {
    this.editPage.show();
    this.PageName = name;
    this.PageAddress = address;
    this.pageService.getSections(name).subscribe((data) => {
      this.curPageSections = data.sort(
        (a: any, b: any) => a.page_position - b.page_position
      );
    });
    this.pageService.getSections('').subscribe((data) => {
      this.unusedSections = data;
      console.log(this.unusedSections);
    });
  }
  hideEditPage() {
    this.editPage.hide();
  }
  addSectionToPage() {
    this.pageService
      .changeSectionPage(this.dropdownSelectedSection, this.PageName)
      .subscribe((data) => {
        let newSectionPagePosition: number = 0;
        if (this.curPageSections.length > 0) {
          newSectionPagePosition =
            this.curPageSections[this.curPageSections.length - 1]
              .page_position + 1;
          console.log(newSectionPagePosition);
        }
        this.pageService
          .changeSectionPosition(
            this.dropdownSelectedSection,
            newSectionPagePosition
          )
          .subscribe((data) => {
            this.pageService.getSections(this.PageName).subscribe((data) => {
              this.curPageSections = data.sort(
                (a: any, b: any) => a.page_position - b.page_position
              );
            });
          });

        this.pageService.getSections('').subscribe((data) => {
          this.unusedSections = data;
        });
      });
  }
  removeSectionFromPage(id: number) {
    this.pageService.changeSectionPage(id, '').subscribe((data) => {
      this.pageService.getSections(this.PageName).subscribe((data) => {
        this.curPageSections = data.sort(
          (a: any, b: any) => a.page_position - b.page_position
        );
        this.pageService.changeSectionPosition(id, 0).subscribe((data) => {});
      });
      this.pageService.getSections('').subscribe((data) => {
        this.unusedSections = data;
      });
    });
  }
  moveSectionUp(id: number) {
    let index = this.curPageSections.findIndex((x) => x.id == id);
    if (index > 0) {
      let temp = this.curPageSections[index - 1];
      this.curPageSections[index - 1] = this.curPageSections[index];
      this.curPageSections[index] = temp;
      this.pageService
        .changeSectionPosition(
          this.curPageSections[index].id,
          this.curPageSections[index - 1].page_position
        )
        .subscribe((data) => {      this.pageService
          .changeSectionPosition(
            this.curPageSections[index - 1].id,
            this.curPageSections[index].page_position
          )
          .subscribe((data) => {
            this.pageService.getSections(this.PageName).subscribe((data) => {
              this.curPageSections = data.sort(
                (a: any, b: any) => a.page_position - b.page_position
              );
            }
            );
          });});

    }
  }
  moveSectionDown(id: number) {
    let index = this.curPageSections.findIndex((x) => x.id == id);
    if (index < this.curPageSections.length - 1) {
      let temp = this.curPageSections[index + 1];
      this.curPageSections[index + 1] = this.curPageSections[index];
      this.curPageSections[index] = temp;
      this.pageService
        .changeSectionPosition(
          this.curPageSections[index].id,
          this.curPageSections[index + 1].page_position
        )
        .subscribe((data) => {
          this.pageService
          .changeSectionPosition(
            this.curPageSections[index + 1].id,
            this.curPageSections[index].page_position
          )
          .subscribe((data) => {
            this.pageService.getSections(this.PageName).subscribe((data) => {
              this.curPageSections = data.sort(
                (a: any, b: any) => a.page_position - b.page_position
              );
            });

          });
        });
    }
  }
  changeColor(){
    this.pageService.changeColor(this.color).subscribe((data) => {
    });
  }
  addPageToMenu(){
    //get previous page position and add 1
    let newPageMenuPosition: number = 1;
    if (this.pagesInMenu.length > 0) {
      newPageMenuPosition = this.pagesInMenu[this.pagesInMenu.length - 1].menu_position + 1;
      console.log(newPageMenuPosition);
    }
    this.pageService.changePageMenuPosition(this.dropdownSelectedPage, newPageMenuPosition).subscribe((data) => {
      this.pageService.getAllPages().subscribe((data) => {
        this.pagesInMenu = data.filter((page: any) => page.menu_position > 0).sort((a: any, b: any) => a.menu_position - b.menu_position);
        this.pageNotInMenu = data.filter((page: any) => page.menu_position == 0);
      }
      );
    });
  }
  deletePageFromMenu(name:string){
    this.pageService.changePageMenuPosition(name, 0).subscribe((data) => {
      this.pageService.getAllPages().subscribe((data) => {
        this.pagesInMenu = data.filter((page: any) => page.menu_position > 0).sort((a: any, b: any) => a.menu_position - b.menu_position);
        this.pageNotInMenu = data.filter((page: any) => page.menu_position == 0);
      }
      );
    });
  }
  pageInMenuUp(name:string){
    let index = this.pagesInMenu.findIndex((x) => x.name == name);
    if (index > 0) {
      let temp = this.pagesInMenu[index - 1];
      this.pagesInMenu[index - 1] = this.pagesInMenu[index];
      this.pagesInMenu[index] = temp;
      this.pageService
        .changePageMenuPosition(
          this.pagesInMenu[index].name,
          this.pagesInMenu[index - 1].menu_position
        )
        .subscribe((data) => {
          this.pageService
          .changePageMenuPosition(
            this.pagesInMenu[index - 1].name,
            this.pagesInMenu[index].menu_position
          )
          .subscribe((data) => {
            this.pageService.getAllPages().subscribe((data) => {
              this.pagesInMenu = data.filter((page: any) => page.menu_position > 0).sort((a: any, b: any) => a.menu_position - b.menu_position);
              this.pageNotInMenu = data.filter((page: any) => page.menu_position == 0);
            });
          });
        });
    }
  }
  pageInMenuDown(name:string){
    let index = this.pagesInMenu.findIndex((x) => x.name == name);
    if (index < this.pagesInMenu.length - 1) {
      let temp = this.pagesInMenu[index + 1];
      this.pagesInMenu[index + 1] = this.pagesInMenu[index];
      this.pagesInMenu[index] = temp;
      this.pageService
        .changePageMenuPosition(
          this.pagesInMenu[index].name,
          this.pagesInMenu[index + 1].menu_position
        )
        .subscribe((data) => {
          this.pageService
          .changePageMenuPosition(
            this.pagesInMenu[index + 1].name,
            this.pagesInMenu[index].menu_position
          )
          .subscribe((data) => {
            this.pageService.getAllPages().subscribe((data) => {
              this.pagesInMenu = data.filter((page: any) => page.menu_position > 0).sort((a: any, b: any) => a.menu_position - b.menu_position);
              this.pageNotInMenu = data.filter((page: any) => page.menu_position == 0);
            });
          });
        });

  }
}
logout(){
  localStorage.removeItem('token');
  window.location.href = '';
}
}

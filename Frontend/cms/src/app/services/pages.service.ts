import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment  } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http: HttpClient) { }

  //get single page by name
  getPage(name: string): Observable<any>{
    return this.http.get<any>(`${environment.api}/pages/${name}/`);
  }
  getPageByAddress(address: string): Observable<any>{
    return this.http.get<any>(`${environment.api}/pages/?address=${address}`);
  }
  //get sections for the page
  getSections(page: string): Observable<any>{
    return this.http.get<any>(`${environment.api}/sections/?page=${page}`);
  }
  addSection(section: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.api}/sections/`, section);
  }
  getAllSections(): Observable<any>{
    return this.http.get<any>(`${environment.api}/sections/`);
  }
  deleteSection(id: number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('token')}`
    });
    return this.http.delete<any>(`${environment.api}/sections/${id}`,{headers});
  }
  updateSectionHtml(id: number, html_content: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('token')}`
    });
    return this.http.patch<any>(`${environment.api}/sections/${id}/`, {html_content},{headers});
  }
  addPage(page: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.api}/pages/`, page,{headers});
  }
  getAllPages(): Observable<any>{
    return this.http.get<any>(`${environment.api}/pages/`);
  }
  deletePage(name:string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('token')}`
    });
    return this.http.delete<any>(`${environment.api}/pages/${name}`,{headers});
  }
  changeSectionPage(section_id: number, page_name: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('token')}`
    });
    return this.http.patch<any>(`${environment.api}/sections/${section_id}/`, {page: page_name},{headers});
  }
  changeSectionPosition(section_id: number, page_position: number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('token')}`
    });
    return this.http.patch<any>(`${environment.api}/sections/${section_id}/`, {page_position: page_position},{headers});
  }
  changeColor(color: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('token')}`
    });
    return this.http.patch<any>(`${environment.api}/websites/1/`, {background: color},{headers});
  }
  getColor(): Observable<any>{
    return this.http.get<any>(`${environment.api}/websites/1/`);
  }
  changePageMenuPosition(name:string,menu_position:number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('token')}`
    });
    return this.http.patch<any>(`${environment.api}/pages/${name}/`, {menu_position: menu_position},{headers});
  }

}

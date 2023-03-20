import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Line } from '../_models/line';

@Injectable({
  providedIn: 'root'
})
export class LineService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getLines(): Observable<Line[]> {
    return  this.http.get<Line[]>(`${this.apiServerUrl}/line/all`);
  }

  public addLine(line: Line): Observable<Line> {
    return this.http.post<Line>(`${this.apiServerUrl}/line/add`, line);
  }

  public addLineToBoard(line: Line, boardId: number): Observable<Line> {
    return this.http.post<Line>(`${this.apiServerUrl}/board/${boardId}/line/add`, line);
  }

  public addLineToBoardById(lineId: number, boardId: number): Observable<Line> {
    return this.http.put<Line>(`${this.apiServerUrl}/board/${boardId}/line/add/${lineId}`, null);
  }

  public updateLine(line: Line): Observable<Line> {
    return this.http.put<Line>(`${this.apiServerUrl}/line/update`, line);
  }

  public deleteLine(lineId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/line/delete/${lineId}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Board } from '../_models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getBoards(): Observable<Board[]> {
    return  this.http.get<Board[]>(`${this.apiServerUrl}/board/all`);
  }

  public getBoard(id: number): Observable<Board> {
    return  this.http.get<Board>(`${this.apiServerUrl}/board/find/${id}`);
  }

  public addBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(`${this.apiServerUrl}/board/add`, board);
  }

  public updateBoard(board: Board): Observable<Board> {
    return this.http.put<Board>(`${this.apiServerUrl}/board/update`, board);
  }

  public deleteBoard(boardId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/board/delete/${boardId}`);
  }
}

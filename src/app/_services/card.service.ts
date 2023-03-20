import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Board } from '../_models/board';
import { Card } from '../_models/card';
import { Line } from '../_models/line';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCards(): Observable<Card[]> {
    return  this.http.get<Card[]>(`${this.apiServerUrl}/card/all`);
  }

  public addCard(card: Card): Observable<Card> {
    return this.http.post<Card>(`${this.apiServerUrl}/card/add`, card);
  }

  public updateCard(card: Card): Observable<Card> {
    return this.http.put<Card>(`${this.apiServerUrl}/card/update`, card);
  }

  public deleteCard(cardId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/card/delete/${cardId}`);
  }

  public addCardToBoard(card: Card, board: Board): Observable<Card> {
    return this.http.post<Card>(`${this.apiServerUrl}/card/${card.id}/setboard/${board.id}`, null);
  }

  public addCardToLine(card: Card, line: Line): Observable<Card> {
    return this.http.post<Card>(`${this.apiServerUrl}/card/${card.id}/setline/${line.id}`, null);
  }
}

import { CardService } from './../_services/card.service';
import { Board } from './../_models/board';
import { Line } from './../_models/line';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BoardService } from '../_services/board.service';
import { LineService } from '../_services/line.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Card } from '../_models/card';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public id?: string | null;
  public board?: Board;
  public lines?: Line[];
  public editLine?: Line;
  public editCard?: Card;
  public deleteLine?: Line;
  public allLines?: Line[];

  constructor(
              private route: ActivatedRoute,
              private boardService: BoardService,
              private lineService: LineService,
              private cardService: CardService){}

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
      });
    // this.id = this.route.snapshot.paramMap.get('id');
    // this.id = '1';
    this.getBoard(+this.id!);
    this.getAllLines();
  }

  public getBoard(id: number): void {
    this.boardService.getBoard(id).subscribe(
      (response: Board) => {
        this.board = response;
        console.log(this.board);
        this.lines = this.board!.lines;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public getAllLines(): any {
    this.lineService.getLines().subscribe(
      (response: Line[]) => {
        this.allLines = response;
        console.log(this.lines);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddLine(addForm: NgForm): void {
    document.getElementById('add-line-form')!.click();
    if (!(this.allLines!.map(x => x.name).includes(addForm.value.name))){
      this.lineService.addLineToBoard(addForm.value, +this.id!).subscribe(
        (response: Line) => {
          console.log(response);
          this.getBoard(+this.id!);
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );
    } else {
      this.lineService.addLineToBoardById( this.lineId(addForm.value.name),+this.id!).subscribe(
        (response: Line) => {
          console.log(response);
          this.getBoard(+this.id!);
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );
    }
  }

  public onAddCard(addForm: NgForm, line: Line): void {
    document.getElementById('add-card-form')!.click();
    this.cardService.addCard(addForm.value).subscribe(
      (response: Card) => {
        this.cardService.addCardToBoard(response, this.board!).subscribe(
          (response: Card) => {
            this.cardService.addCardToLine(response, line).subscribe(
              (response: Card) => {
                console.log(response);
                this.getBoard(+this.id!);
                addForm.reset();
              },
              (error: HttpErrorResponse) => {
                alert(error.message);
                addForm.reset();
              });
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
            addForm.reset();
          });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }


  public lineId(name: String): number {
    return this.allLines!.filter((obj) => {
      return obj.name === name;
    })[0].id;
  }

  public onUpdateCard(card: Card): void {
    this.cardService.updateCard(card).subscribe(
      (response: Card) => {
        console.log(response);
        this.getBoard(+this.id!);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteLine(lineId: number): void {
    this.lineService.deleteLine(lineId).subscribe(
      (response: void) => {
        console.log(response);
        this.getBoard(+this.id!);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(mode: string, line?: Line, card?: Card): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addLineModal');
    }
    if (mode === 'addCard') {
      this.editLine = line;
      button.setAttribute('data-bs-target', '#addCardModal');
    }
    if (mode === 'edit') {
      this.editCard = card;
      button.setAttribute('data-bs-target', '#updateCardModal');
    }
    if (mode === 'delete') {
      this.deleteLine = line;
      button.setAttribute('data-bs-target', '#deleteLineModal');
    }
    container!.appendChild(button);
    button.click();
  }
}

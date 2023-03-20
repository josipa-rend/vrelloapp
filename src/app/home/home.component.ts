import { Board } from './../_models/board';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BoardService } from '../_services/board.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public boards?: Board[];
  public editBoard?: Board;
  public deleteBoard?: Board;

  constructor(
    private router: Router,
    private boardService: BoardService){}

  ngOnInit() {
    this.getBoards();
  }

  public getBoards(): void {
    this.boardService.getBoards().subscribe(
      (response: Board[]) => {
        this.boards = response;
        console.log(this.boards);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddBoard(addForm: NgForm): void {
    document.getElementById('add-board-form')!.click();
    this.boardService.addBoard(addForm.value).subscribe(
      (response: Board) => {
        console.log(response);
        this.getBoards();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateBoard(board: Board): void {
    this.boardService.updateBoard(board).subscribe(
      (response: Board) => {
        console.log(response);
        this.getBoards();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteBoard(boardId: number): void {
    this.boardService.deleteBoard(boardId).subscribe(
      (response: void) => {
        console.log(response);
        this.getBoards();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onManage(board: Board): void {
    this.router.navigate(['/board', board.id])
  }

  public onOpenModal(mode: string, board?: Board): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addBoardModal');
    }
    if (mode === 'edit') {
      this.editBoard = board;
      button.setAttribute('data-bs-target', '#updateBoardModal');
    }
    if (mode === 'delete') {
      this.deleteBoard = board;
      button.setAttribute('data-bs-target', '#deleteBoardModal');
    }
    container!.appendChild(button);
    button.click();
  }

}

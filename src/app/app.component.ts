import { UserService } from './_services/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from './_models/user';
import { Board } from './_models/board';
import { BoardService } from './_services/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private boardService: BoardService){}

  ngOnInit(): void {
  }
}

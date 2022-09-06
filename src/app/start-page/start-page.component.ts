import { TrainingService } from './../training/training.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {
  constructor(private tSer:TrainingService) {}
  fetch(){
    this.tSer.fetchAvailableExercises()
  }

  ngOnInit(): void {}
}

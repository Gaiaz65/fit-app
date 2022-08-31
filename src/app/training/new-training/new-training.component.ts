import { NgForm } from '@angular/forms';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  exercises:Exercise[] = [];

  constructor(private trService:TrainingService) {}

  ngOnInit() {
    this.exercises = this.trService.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trService.startExercise(form.value.exercise);
  }
}

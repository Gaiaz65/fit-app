import {  Subscription } from 'rxjs';

// import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';

import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';



@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: any =[];
  trSub:Subscription;
  isLoading = true;

  constructor(
    private trService: TrainingService,
  ) {}

  ngOnInit() {
    this.trSub = this.trService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = ([...exercises]);
        this.isLoading = false;
      }
    )
    this.trService.fetchAvailableExercises()
    };

  ngOnDestroy(): void {
    if (this.trSub){
      this.trSub.unsubscribe()
    }

  }

  onStartTraining(form: NgForm) {
    this.trService.startExercise(form.value.exercise);
  }
}

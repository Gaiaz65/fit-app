import { Observable, Subscription } from 'rxjs';

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

  constructor(
    private trService: TrainingService,
  ) {}

  ngOnInit() {
    this.trSub = this.trService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = ([...exercises]);
      }
    )
    this.trService.fetchAvailableExercises()
    };

  ngOnDestroy(): void {
      this.trSub.unsubscribe()
  }

  onStartTraining(form: NgForm) {
    this.trService.startExercise(form.value.exercise);
  }
}

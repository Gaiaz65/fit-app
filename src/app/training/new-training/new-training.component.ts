// import { AngularFirestore } from 'angularfire2/firestore';
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
  exercises: Exercise[] = [];

  constructor(
    private trService: TrainingService // private dataB:AngularFirestore
  ) {}

  ngOnInit() {
    // this.dataB.collection('availableExercises').valueChanges().subscribe (result =>
    //   console.log (result))
  }

  onStartTraining(form: NgForm) {
    this.trService.startExercise(form.value.exercise);
  }
}

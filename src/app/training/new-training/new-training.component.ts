import { Exercise } from './../exercise.model';
// import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';

import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  exercises:any;

  constructor(
    private trService: TrainingService,
    private dataB:AngularFirestore
  ) {}

  ngOnInit() {
  this.dataB
   .collection('availableExercises')
   .snapshotChanges()
   .pipe()
   .subscribe(res => console.log (res))
  }

  onStartTraining(form: NgForm) {
    this.trService.startExercise(form.value.exercise);
  }
}

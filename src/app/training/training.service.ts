import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedexercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise | any;
  private finishedExercises: Exercise[] = [];

  constructor(private dataB: AngularFirestore) {}

  fetchAvailableExercises() {
    this.dataB
      .collection('availableExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        console.log(exercises);
      });
    this.exercisesChanged.next([...this.availableExercises]);
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  cancelExercise(progress: number) {
    this.finishedExercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    console.log(this.finishedExercises);
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  completedExercise() {
    this.finishedExercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    console.log(this.finishedExercises);
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchCompCancEx() {
    //get completed or cancelled exercises
    this.dataB.collection('fifnishedExercises').valueChanges()
    .subscribe ((exercises:Exercise[])=> {
      this.finishedExercises = exercises;
      this.finishedexercisesChanged.next(exercises)
    });
  }
  private addDatToDB(exercise: Exercise) {
    this.dataB.collection('fifnishedExercises').add(exercise);
  }
}

import { UIService } from './../shared/ui.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Exercise } from './exercise.model';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedexercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private finishedExercises: Exercise[] = [];
  private fbSub = [];

  constructor(private dataB: AngularFirestore,
      private uiService: UIService) {}

  fetchAvailableExercises() {
    const AvailableSubs = this.dataB
      .collection('availableExercises')
      .valueChanges()
      .subscribe(
        (exercises: Exercise[]) => {
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        },
        (error) => {
          this.uiService.showSnackbar('There is an issue. Please, try again later', null, 5000);
        }
      );
    this.fbSub.push(AvailableSubs);
  }

  startExercise(selectedEx: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.name === selectedEx
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  cancelExercise(progress: number) {
    this.addDatToDB({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  completedExercise() {
    this.addDatToDB({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchCompCancEx() {
    //get completed or cancelled exercises
    const complCanEx = this.dataB
      .collection('fifnishedExercises')
      .valueChanges()
      .subscribe(
        (exercises: Exercise[]) => {
          this.finishedExercises = exercises;
          this.finishedexercisesChanged.next(exercises);
        },
        (error) => {
          this.uiService.showSnackbar('There is an issue. Please, try again later', null, 5000);
        }
      );
    this.fbSub.push(complCanEx);
  }

  cancelSubscriptions() {
    this.fbSub.forEach((sub) => sub.unsubscribe());
  }

  private addDatToDB(exercise: Exercise) {
    console.log(exercise);

    this.dataB.collection('fifnishedExercises').add(exercise);
  }
}

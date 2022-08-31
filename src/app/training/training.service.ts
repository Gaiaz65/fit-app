import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 10, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];

  private runningExercise: Exercise | any;
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice();
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
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    console.log(this.exercises);
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  completedExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    console.log (this.exercises)
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getCompCancEx(){
    //get completed or cancelled exercises
    return this.exercises.slice();
  }
}

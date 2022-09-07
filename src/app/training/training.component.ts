import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;
  exerciseSub:Subscription;

  constructor(private trService: TrainingService) {}

  ngOnInit() {
    this.exerciseSub =
    this.trService.exerciseChanged.subscribe(
      exersice => {
        if (exersice){
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    )
  }

  ngOnDestroy() {
    if (this.exerciseSub){
      this.exerciseSub.unsubscribe()
    }
  }

}

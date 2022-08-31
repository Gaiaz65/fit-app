import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  eProgress: number = 0;
  timer: any;

  constructor(private dialog: MatDialog,
    private trService: TrainingService) {}

  ngOnInit(): void {
      this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = this.trService.getRunningExercise().duration/100*1000;
    this.timer = setInterval(() => {
      this.eProgress = this.eProgress + 1;
      if (this.eProgress >= 100) {
        this.trService.completedExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.eProgress,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trService.cancelExercise(this.eProgress);
      }
      else {
          this.startOrResumeTimer();
      }
    });
  }
}

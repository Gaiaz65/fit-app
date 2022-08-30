import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter<void>();
  eProgress: number = 0;
  timer: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
      this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.eProgress = this.eProgress + 20;
      if (this.eProgress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
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
        this.trainingExit.emit();
      }
      else {
          this.startOrResumeTimer();
      }
    });
  }
}

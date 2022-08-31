import { TrainingService } from './../training.service';
import { Exercise } from './../exercise.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit {
  displayedColumns = ['date','name','duration','calories','state'];
  dataSource = new MatTableDataSource<Exercise>();



  constructor(
    private trService:TrainingService
  ) { }

  ngOnInit() {
    this.dataSource.data = this.trService.getCompCancEx();
  }

}

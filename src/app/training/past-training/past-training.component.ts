import { Subscription } from 'rxjs';
import { TrainingService } from './../training.service';
import { Exercise } from './../exercise.model';
import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private trService: TrainingService) {}

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exChanged:Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginatior: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginatior;
  }

  ngOnInit() {
    this.exChanged = this.trService.finishedexercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      }
    );
    this.trService.fetchCompCancEx();
  }

  doFilter(filterValue: any) {
    if (filterValue.value != null) {
      this.dataSource.filter = filterValue.value.trim().toLowerCase();
    } else {
      this.dataSource;
    }
  }
  ngOnDestroy() {
    this.exChanged.unsubscribe()
  }
}

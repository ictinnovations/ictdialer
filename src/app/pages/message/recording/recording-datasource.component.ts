import { Recording } from './recording';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { MatSortHeaderIntl } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { RecordingDatabase } from './recording-database.component';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

export class RecordingDataSource extends DataSource<Recording> {

  constructor(private recordingDatabase: RecordingDatabase, private _sort: MatSort,
  private _paginator: MatPaginator) {
    super();
  }

  connect(): Observable<Recording[]> {
    const displayDataChanges = [
      this.recordingDatabase.dataChange,
      this._sort.sortChange,
      this._paginator.page,
    ];
    return Observable.merge(...displayDataChanges)
    .map(() => this.getSortedData())
    .map(data => this.paginate(data));
  }

  disconnect() { }
  getSortedData(): Recording[] {
    const data = this.recordingDatabase.data.slice();
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a , b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'ID': [propertyA, propertyB] = [a.recording_id, b.recording_id]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'type': [propertyA, propertyB] = [a.type, b.type]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) *
      (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

  paginate(data) {
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    return data.splice(startIndex, this._paginator.pageSize);
  }
}
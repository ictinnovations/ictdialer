import { IVR } from './ivr';
import { Response } from '@angular/http';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { MatSortHeaderIntl } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { PageEvent } from '@angular/material';
import { IVRDatabase } from './ivr-database.component';


import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

export class IVRDataSource extends DataSource<IVR> {

    constructor(
      private ivrDatabase: IVRDatabase,
      private _sort: MatSort,
      private _paginator: MatPaginator) {
       super();
    }

    connect(): Observable<IVR[]> {
       const displayDataChanges = [
         this.ivrDatabase.dataChange,
         this._paginator.page,
         this._sort.sortChange,
       ];
       return Observable.merge(...displayDataChanges)
       .map(() => this.getSortedData())
       .map(data => this.paginate(data));
    }

    disconnect() { }
    getSortedData(): IVR[] {
      const data = this.ivrDatabase.data.slice();
      if (!this._sort.active || this._sort.direction === '') {
        return data;
      }
      return data.sort((a , b) => {
        let propertyA: number|string = '';
        let propertyB: number|string = '';

        switch (this._sort.active) {
          case 'ID': [propertyA, propertyB] = [a.program_id, b.program_id]; break;
          case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
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


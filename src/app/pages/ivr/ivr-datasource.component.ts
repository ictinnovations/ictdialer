import { IVR } from './ivr';
import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { IVRDatabase } from './ivr-database.component';

import { Observable, merge, BehaviorSubject } from 'rxjs';

export class IVRDataSource extends DataSource<IVR> {

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: IVR[] = [];
  renderedData: IVR[] = [];

  constructor(
    private ivrDatabase: IVRDatabase, private _sort: MatSort, private _paginator: MatPaginator) {
      super();

      this._filterChange.subscribe(() => this._paginator.pageIndex = 0
    );
  }

  connect(): Observable<IVR[]> {
    const displayDataChanges = [
      this.ivrDatabase.dataChange,
      this._paginator.page,
      this._filterChange,
      this._sort.sortChange,
    ];
    return merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.ivrDatabase.data.slice().filter((item: IVR) => {
        let searchStr = (item.name + item.description).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });

      // Sort filtered data
      const sortedData = this.getSortedData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    })
  }

  disconnect() { }
  getSortedData(data): IVR[] {
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
}


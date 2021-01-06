import { Text } from './text';
import { DataSource } from '@angular/cdk/collections';
import { MatSort, MatPaginator } from '@angular/material';
import { TextDatabase } from './text-database.component';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';

import { Observable, merge } from 'rxjs';

export class TextDataSource extends DataSource<Text> {

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: Text[] = [];
  renderedData: Text[] = [];

  constructor(private textDatabase: TextDatabase, private _sort: MatSort,
    private _paginator: MatPaginator) {
    
    super();

    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<Text[]> {
    const displayDataChanges = [
      this.textDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];
    return merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.textDatabase.data.slice().filter((item: Text) => {
        let searchStr = (item.name + item.description + item.type).toLowerCase();
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
  getSortedData(data): Text[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a , b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'ID': [propertyA, propertyB] = [a.text_id, b.text_id]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) *
      (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

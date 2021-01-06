import { Template } from './email';
import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { TemplateDatabase } from './email-database.component';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';

import { Observable, merge } from 'rxjs';
export class  TemplateDataSource extends DataSource<Template> {

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: Template[] = [];
  renderedData: Template[] = [];

  constructor(private templateDatabase: TemplateDatabase, private _sort: MatSort,
    private _paginator: MatPaginator) {
    super();

    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<Template[]> {
    const displayDataChanges = [
      this.templateDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.templateDatabase.data.slice().filter((item: Template) => {
        let searchStr = (item.name + item.subject).toLowerCase();
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
  getSortedData(data): Template[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a , b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'ID': [propertyA, propertyB] = [a.template_id, b.template_id]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'type': [propertyA, propertyB] = [a.type, b.type]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) *
      (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

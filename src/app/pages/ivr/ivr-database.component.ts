import { IVR } from './ivr';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class IVRDatabase {
  dataChange: BehaviorSubject<IVR[]> = new BehaviorSubject<IVR[]>([]);
  get data(): IVR[] {
    return this.dataChange.value;
  }
  constructor(aIvr: IVR[]) {
    const ivrData = aIvr.slice();
    this.dataChange.next(ivrData);
  }
}

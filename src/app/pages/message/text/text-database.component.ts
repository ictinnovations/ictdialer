import { Text } from './text';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';

export class TextDatabase {
  dataChange: BehaviorSubject<Text[]> = new BehaviorSubject<Text[]>([]);
  get data(): Text[] {
    return this.dataChange.value;
  }
  constructor(private aText: Text[]) {
    const textData = aText.slice();
    this.dataChange.next(textData);
  }
}

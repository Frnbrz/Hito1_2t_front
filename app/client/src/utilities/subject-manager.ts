//FOR SHARING EVENT BETWEEN COMPONENTS
import { Subject } from 'rxjs'
export class SubjectManager {
  subject$ = new Subject()

  get getSubject() {
    return this.subject$.asObservable()
  }

  set setSubject(value: any) {
    this.subject$.next(value)
  }
}

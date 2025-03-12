import { Injectable } from '@angular/core';
import { Observable, of, from, interval, timer, merge,concat } from 'rxjs';
import { 
   map, filter, tap, take, mergeMap, switchMap, concatMap, exhaustMap, debounceTime, distinctUntilChanged, delay 
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RxjsService {
  constructor() {}

  // Emits a list of numbers
  getNumberObservable(): Observable<number> {
    return of(1, 2, 3, 4, 5);
  }
  
  getNumberObservable2(): Observable<number> {
    return of(6, 7, 8, 9, 10);
  }
  // Emits a list of strings
  getStringObservable(): Observable<string> {
    return from(['Angular', 'RxJS', 'Operators', 'Stream']);
  }

  // Emits values every second (simulating real-time updates)
  getIntervalObservable(): Observable<number> {
    return interval(1000).pipe(take(5)); // Emits 0,1,2,3,4 then completes
  }

  // Simulated network request
  getDelayedObservable(value: string): Observable<string> {
    return of(`Processed: ${value}`).pipe(delay(1000));
  }

  // Map - Multiply each number by 10
  getMappedObservable(): Observable<number> {
    return this.getNumberObservable().pipe(map(num => num * 10));
  }

  // Filter - Only even numbers
  getFilteredObservable(): Observable<number> {
    return this.getNumberObservable().pipe(filter(num => num % 2 === 0));
  }

  // Tap - Log each emitted value
  getTappedObservable(): Observable<number> {
    return this.getNumberObservable().pipe(tap(num => console.log('Tapped:', num)));
  }

  // MergeMap - Runs all inner observables concurrently
  getMergedObservable(): Observable<string> {
    return this.getStringObservable().pipe(mergeMap(word => this.getDelayedObservable(word)));
  }

  // SwitchMap - Cancels previous observable if a new one arrives
  getSwitchMappedObservable(): Observable<string> {
    return this.getStringObservable().pipe(switchMap(word => this.getDelayedObservable(word)));
  }

  // ConcatMap - Processes one observable at a time in order
  getConcatMappedObservable(): Observable<string> {
    return this.getStringObservable().pipe(concatMap(word => this.getDelayedObservable(word)));
  }

  // ExhaustMap - Ignores new emissions while processing the current one
  getExhaustMappedObservable(): Observable<string> {
    return interval(500).pipe(take(5), exhaustMap(value => this.getDelayedObservable(`Request ${value}`)));
  }

  // DebounceTime - Only emits after a pause (e.g., useful for search input)
  getDebouncedObservable(): Observable<number> {
    return this.getIntervalObservable().pipe(debounceTime(1500));
  }

  // DistinctUntilChanged - Ignores duplicate values
  getDistinctObservable(): Observable<number> {
    return of(1, 1, 2, 2, 3, 3, 4).pipe(distinctUntilChanged());
  }

  getMergeObservable(): Observable<string> {
    return merge(this.getStringObservable(), this.getNumberObservable().pipe(map(num => num.toString())));
  }

  getConcatObservable(): Observable<string> {
    return concat(this.getNumberObservable().pipe(map(num => num.toString())), this.getNumberObservable2().pipe(map(num => num.toString())));
  }
}
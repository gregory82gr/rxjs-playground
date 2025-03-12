import { Component } from '@angular/core';
import { RxjsService } from '../rxjs.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rxjs-operators',
  imports: [CommonModule],
  template: `
    <h2>RxJS Operators Playground</h2>

    <button (click)="testOperator('map')">Test Map</button>
    <button (click)="testOperator('filter')">Test Filter</button>
    <button (click)="testOperator('tap')">Test Tap</button>
    <button (click)="testOperator('mergeMap')">Test MergeMap</button>
    <button (click)="testOperator('switchMap')">Test SwitchMap</button>
    <button (click)="testOperator('concatMap')">Test ConcatMap</button>
    <button (click)="testOperator('exhaustMap')">Test ExhaustMap</button>
    <button (click)="testOperator('debounceTime')">Test DebounceTime</button>
    <button (click)="testOperator('distinctUntilChanged')">Test DistinctUntilChanged</button>
    

    <h2>RxJS  Playground</h2>

    <button (click)="testOperator('merge')">Merge</button>
    <button (click)="testOperator('concat')">Concat</button>

    <h2>RxJS  Results</h2>
    <div *ngFor="let result of results">{{ result }}</div>
  `,
})
export class RxjsOperatorsComponent {
  results: any[] = [];

  constructor(private rxjsService: RxjsService) {}

  testOperator(operator: string) {
    this.results = []; // Clear previous results

    let observable$: Observable<any> = new Observable();
    switch (operator) {
      case 'map':
        observable$ = this.rxjsService.getMappedObservable();
        break;
      case 'filter':
        observable$ = this.rxjsService.getFilteredObservable();
        break;
      case 'tap':
        observable$ = this.rxjsService.getTappedObservable();
        break;
      case 'mergeMap':
        observable$ = this.rxjsService.getMergedObservable();
        break;
      case 'switchMap':
        observable$ = this.rxjsService.getSwitchMappedObservable();
        break;
      case 'concatMap':
        observable$ = this.rxjsService.getConcatMappedObservable();
        break;
      case 'exhaustMap':
        observable$ = this.rxjsService.getExhaustMappedObservable();
        break;
      case 'debounceTime':
        observable$ = this.rxjsService.getDebouncedObservable();
        break;
      case 'distinctUntilChanged':
        observable$ = this.rxjsService.getDistinctObservable();
        break;
      case 'merge':
        observable$ = this.rxjsService.getMergeObservable(); // Merge all observables
        break;
      case 'concat':
        observable$ = this.rxjsService.getConcatObservable(); // Concatenate all observables  
        break;  

    }

    observable$.subscribe((value: any) => this.results.push(value));
  }
}

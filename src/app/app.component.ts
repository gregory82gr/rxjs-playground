import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RxjsOperatorsComponent } from "./rxjs-operators/rxjs-operators.component";
import { MarbleDiagramComponent } from './marble-diagram/marble-diagram.component';
import { ConcatmapDiagramComponent } from './concatmap-diagram/concatmap-diagram.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RxjsOperatorsComponent,MarbleDiagramComponent,ConcatmapDiagramComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rxjs-playground';
}

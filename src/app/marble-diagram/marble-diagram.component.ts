import { Component, OnInit } from '@angular/core';
import { interval,merge } from 'rxjs';
import { map, take ,tap} from 'rxjs/operators';
import gsap from 'gsap';
import { CommonModule } from '@angular/common';


interface Marble {
  id: number;
  value: string;
}
@Component({
  selector: 'app-marble-diagram',
  imports: [CommonModule],
  templateUrl: './marble-diagram.component.html',
  styleUrl: './marble-diagram.component.css'
})
export class MarbleDiagramComponent implements OnInit{
  marbles = [
    { id: 1, value: '1' },
    { id: 2, value: '2' },
    { id: 3, value: '3' },
    { id: 4, value: '4' },
  ];

  ngOnInit() {
    interval(1000)
      .pipe(
        take(this.marbles.length),
        map((i) => ({ index: i, newValue: `M${this.marbles[i].value}` })), // Transform data
        tap(({ index, newValue }) => {
          this.marbles[index].value = newValue; // Update marble value
          this.animateMarble(index);
        })
      )
      .subscribe();
  }

  animateMarble(index: number) {
    gsap.to(`#marble-${this.marbles[index].id}`, { x: index * 50 + 50, duration: 1 });
  }
}

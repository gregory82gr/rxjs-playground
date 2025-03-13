import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { concatMap, map, take, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';


interface OuterMarble {
  id: number;
  value: string;
}

interface InnerMarble {
  outerIndex: number;
  innerIndex: number;
  value: string;
}
@Component({
  selector: 'app-concatmap-diagram',
   imports: [CommonModule],
  templateUrl: './concatmap-diagram.component.html',
  styleUrl: './concatmap-diagram.component.css'
})
export class ConcatmapDiagramComponent implements OnInit{

  // Outer observable: three marbles labeled A, B, and C.
  outerMarbles: OuterMarble[] = [
    { id: 1, value: 'A' },
    { id: 2, value: 'B' },
    { id: 3, value: 'C' }
  ];

  innerRows: InnerMarble[][] = [];

   // Final output marbles (bottom row)
   finalOutputMarbles: InnerMarble[] = [];
   ngOnInit() {
    // Outer observable emits once every 1500ms.
    interval(1500)
      .pipe(
        take(this.outerMarbles.length),
        tap(outerIndex => {
          // Animate the outer marble in the top row.
          const targetX = outerIndex * 150;
          gsap.to(`#outer-${this.outerMarbles[outerIndex].id}`, { x: targetX, duration: 0.5 });

          // Initialize a new row for inner marbles corresponding to this outer marble.
          this.innerRows[outerIndex] = [];
        }),
        // For each outer marble, use concatMap to process its inner observable sequentially.
        concatMap(outerIndex =>
          interval(700).pipe(
            take(4), // Each outer marble maps to 3 inner emissions.
            map(innerIndex => ({
              outerIndex,
              innerIndex,
              value: `I ${this.outerMarbles[outerIndex].value}-${innerIndex + 1}`
            })),
            tap(innerData => {
              // Push the inner marble into its dedicated inner row (middle section).
              this.innerRows[innerData.outerIndex].push(innerData);
              // Animate the inner marble in its own row.
              setTimeout(() => this.animateInnerMarble(innerData), 0);

              // Also add to final output (bottom row) and animate it.
              this.finalOutputMarbles.push(innerData);
              setTimeout(() => this.animateFinalOutputMarble(innerData), 0);
            })
          )
        )
      )
      .subscribe();
  }

  // Animate inner marble within its specific inner row (middle section).
  animateInnerMarble(data: InnerMarble) {
    // Horizontal target based on innerIndex.
    const targetX = data.innerIndex * 80;
    gsap.to(`#inner-${data.outerIndex}-${data.innerIndex}`, { x: targetX, duration: 1 });
  }

  // Animate final output marble in the bottom row.
  animateFinalOutputMarble(data: InnerMarble) {
    const indexInOutput = this.finalOutputMarbles.findIndex(
      m => m.outerIndex === data.outerIndex && m.innerIndex === data.innerIndex
    );
    const targetX = indexInOutput * 80;
    gsap.to(`#output-${data.outerIndex}-${data.innerIndex}`, { x: targetX, duration: 1 });
  }
}


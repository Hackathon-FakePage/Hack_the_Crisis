import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { group } from '@angular/animations';

@Component({
  selector: 'app-highlight',
  template: '{{text}}',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit, OnChanges {
  @Input() indices: number[];
  @Input() text: string;
  spanStart = '<span class="highlight">';
  spanStartLength = this.spanStart.length;
  spanEnd = '</span>';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.transformText();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.transformText();
    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      this.text
    );
  }

  transformText(): void {
    const sortedIndices = _.sortBy(this.indices);
    const groupedIndices = this.getGroupedIndices(sortedIndices).reverse();
    while (groupedIndices.length) {
      const indexGroup = groupedIndices[0];
      const indexStart = _.first(indexGroup);
      const indexEnd = _.last(indexGroup);
      const firstSpanInsert = this.text.slice(0, indexStart) + this.spanStart + this.text.slice(indexStart);
      this.text = firstSpanInsert.slice(0, indexEnd + this.spanStartLength + 1) + this.spanEnd +
        firstSpanInsert.slice(indexEnd + this.spanStartLength + 1);
      groupedIndices.shift();
    }
  }

  private getGroupedIndices(flatIndices: number[]): number[][] {
    const indicesGrouped: number[][] = [];
    while (flatIndices.length) {
      const tempArray: number[] = [];
      for (let i = 0; i < flatIndices.length; i++) {
        tempArray.push(flatIndices[i]);
        if (flatIndices[i + 1] !== flatIndices[i] + 1) {
          break;
        }
      }
      flatIndices = _.xor(flatIndices, tempArray);
      indicesGrouped.push(tempArray);
    }
    return indicesGrouped;
  }
}

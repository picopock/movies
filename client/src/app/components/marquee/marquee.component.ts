import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-marquee',
  styleUrls: ['./marquee.component.css'],
  template: './marquee.component.html'
})
export class MarqueeComponent implements AfterViewInit {
  @Input() contentText: string = '';
  @Input() animationDuration: string = '10s';
  private marqueeWidth: string = '0px';

  ngAfterViewInit() {
    let marquee = document.getElementById('marquee');
    this.marqueeWidth = document.defaultView.getComputedStyle(marquee).width;
  }
}

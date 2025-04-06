import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TVshow } from '../tv';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tv-show-card',
  standalone: true, // Add this flag
  imports: [CommonModule, RouterLink], // Add CommonModule for common directives
  templateUrl: './tv-show-card.component.html',
  styleUrls: ['./tv-show-card.component.css']
})
export class TvShowCardComponent {
  @Input() tvshow!: TVshow;
  @Output() myEvent = new EventEmitter<string>();

  defaultImage = 'https://via.placeholder.com/500x750?text=No+Poster';

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImage;
  }

  fireMyEvent(): void {
    this.myEvent.emit(`You clicked on ${this.tvshow.name}`);
  }
}
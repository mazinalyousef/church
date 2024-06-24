import { Component } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() toggleDropdownEvent = new EventEmitter<void>();

  onToggleDropdown() {
    this.toggleDropdownEvent.emit();
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  carList = ['car1', 'car2', 'car3', 'car3'];
  constructor() { }

  ngOnInit() {
  }

  // allowDrop(ev) {
  //   ev.preventDefault();
  // }

  // drag(ev) {
  //   ev.dataTransfer.setData('text', ev.target.id);
  // }

  // drop(ev) {
  //   ev.preventDefault();
  //   const data = ev.dataTransfer.getData('text');
  //   ev.target.appendChild(document.getElementById(data));
  // }

}

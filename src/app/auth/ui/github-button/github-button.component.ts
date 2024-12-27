import { Component, output } from '@angular/core';

@Component({
  selector: 'app-github-button',
  imports: [],
  templateUrl: './github-button.component.html',
})
export class GithubButtonComponent {
  onClick = output<void>();
}

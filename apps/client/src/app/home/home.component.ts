import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '@fitb/ui/form';
import { ConfigService } from '@fitb/data-access';
@Component({
  selector: 'corp-home',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  configService = inject(ConfigService);

  // Read the configurations
  config$ = this.configService.getConfig();
}

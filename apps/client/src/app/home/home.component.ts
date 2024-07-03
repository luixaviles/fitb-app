import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UiInputComponent } from '@fitb/ui-input';
import { DropdownOption, UiDropdownComponent } from '@fitb/ui-dropdown';
import { tap } from 'rxjs';

@Component({
  selector: 'corp-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiInputComponent,
    UiDropdownComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  currencyOptions: DropdownOption[] = [
    { name: 'USD', value: 'usd' },
    { name: 'EURO', value: 'euro' },
    { name: 'Pound', value: 'pound' },
  ];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    currency: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {
    this.form.controls.name.valueChanges
      .pipe(tap((value) => console.log(value)))
      .subscribe();
  }

  get name(): AbstractControl<string> {
    return this.form.get('name') as AbstractControl<string>;
  }
}

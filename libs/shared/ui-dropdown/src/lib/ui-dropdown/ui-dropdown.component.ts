import { NgClass } from '@angular/common';
import { Component, DestroyRef, EventEmitter, forwardRef, inject, Input, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { noop, tap } from 'rxjs';

export type DropdownOption = {name: string, value: string};

@Component({
  selector: 'fitb-dropdown',
  standalone: true,
  imports: [NgClass, NgbDropdownModule, ReactiveFormsModule],
  templateUrl: './ui-dropdown.component.html',
  styleUrl: './ui-dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiDropdownComponent),
      multi: true,
    },
  ],
})
export class UiDropdownComponent implements ControlValueAccessor, OnInit{
  @Input() placeholder = 'Select';
  @Input() options:DropdownOption[] | null = null;
  @Input() formGroupParent!: FormGroup;
  @Input() controlName!: string;
  @Output() optionChange = new EventEmitter<DropdownOption>();
  formControl!: FormControl;

  destroyRef: DestroyRef = inject(DestroyRef);

  onChange: (value: DropdownOption) => void = noop;
  onTouch: () => void = noop;

  registerOnChange(fn: (value: DropdownOption) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  writeValue(value: DropdownOption): void {
    this.formControl.setValue(value, { emitEvent: true });
  }
  
  ngOnInit(): void {
    this.formControl = <FormControl>this.formGroupParent.get(this.controlName);
    this.formControl.valueChanges
      .pipe(
        tap(value => console.log('[dropdown.component]', value)),
        tap((value) => this.onChange(value)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  onOptionChange(option: DropdownOption): void {
    this.writeValue(option);
    this.optionChange.emit(option);
  }

  get option(): DropdownOption {
    return this.formControl.value;
  }
}

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { WidgetNodeData } from '@fitb-app/types';
import { FormGroup } from '@angular/forms';
import { UiInputComponent } from '@fitb/ui-input';
import { UiDropdownComponent } from '@fitb/ui-dropdown';
import { AsyncPipe } from '@angular/common';

export type WidgetNodeDataForm = WidgetNodeData & {
  formGroup?: FormGroup;
  widget?: 'input' | 'select-with-options';
  options?: { name: string; value: string }[];
  placeholder?: string;
};

@Component({
  selector: 'fitb-widget',
  standalone: true,
  imports: [AsyncPipe, UiInputComponent, UiDropdownComponent],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent {
  nodes = input.required<WidgetNodeDataForm[]>();
}

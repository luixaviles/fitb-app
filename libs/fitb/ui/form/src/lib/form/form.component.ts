import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { WidgetComponent, WidgetNodeDataForm } from '@fitb/ui/widget';
import {
  FormDataConfig,
  SelectField,
  WidgetConfig,
  WidgetNodeData,
} from '@fitb-app/types';
import { ConfigService } from '@fitb/data-access';

@Component({
  selector: 'fitb-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, WidgetComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  config = input.required<WidgetConfig>();

  fb = inject(FormBuilder);
  configService = inject(ConfigService);

  form: FormGroup | undefined = undefined;
  formArray = new FormArray<FormGroup>([]);

  data$: Observable<WidgetNodeDataForm[]> | undefined = undefined;
  formData$ = this.configService.getFormData();

  ngOnInit(): void {
    const inputData$ = combineLatest([
      of(this.config().formDataFillInTheBlanks.data),
      this.formData$,
    ]);

    this.data$ = inputData$.pipe(
      map(([data, formData]) => {
        return data.map((nodeData) => this.parseWidgetData(nodeData, formData));
      }),
      tap(() => {
        this.form = this.fb.group({
          array: this.formArray,
        });
      })
    );
  }

  private parseWidgetData(
    nodeData: WidgetNodeData,
    formData: FormDataConfig
  ): WidgetNodeDataForm {
    if (nodeData.type === 'fieldControl') {
      const formDataType =
        formData[nodeData.formDataPointer as keyof FormDataConfig];
      const formGroup = this.createFormGroupForItem(nodeData, formData);
      this.formArray.push(formGroup);
      return {
        ...nodeData,
        formGroup,
        widget: formDataType.type,
        placeholder: formDataType.placeholder,
        options: (formDataType as SelectField).options,
        nodes: nodeData.nodes?.map((node) => ({
          ...node,
          // Recursive call to allow map children/nested data
          children: node.children?.map((child) =>
            this.parseWidgetData(child, formData)
          ),
        })),
      } as WidgetNodeDataForm;
    }
    return nodeData;
  }

  private createFormGroupForItem(
    item: WidgetNodeData,
    formData: FormDataConfig
  ): FormGroup {
    const formDataType = formData[item.formDataPointer as keyof FormDataConfig];
    let defaultValue: string | null | { name: string; value: string } = null;

    if (formDataType.type === 'input') {
      defaultValue = formDataType.default;
    } else if (formDataType.type === 'select-with-options') {
      defaultValue =
        formDataType.options.find((d) => d.value === formDataType.default) ||
        null;
    }

    return this.fb.group({
      data: [defaultValue, this.getValidators(item.validators)],
    });
  }

  private getValidators(
    validators: { type: string }[] | undefined
  ): ValidatorFn[] {
    if (!validators) {
      return [];
    }

    return validators
      .filter((v) => v.type === 'required')
      .map(() => Validators.required);
  }
}

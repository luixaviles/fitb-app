import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { widgetDisplayOptions } from '@fitb/data';
import { FormDataConfig, WidgetConfig } from '@fitb-app/types';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly config$ = of<WidgetConfig>(widgetDisplayOptions);
  private readonly formData$ = this.config$.pipe(
    map(config => config.formData)
  );

  getConfig(): Observable<WidgetConfig> {
    return this.config$.pipe(
      delay(500)
    );
  }

  getFormData(): Observable<FormDataConfig> {
    return this.formData$;
  }
}

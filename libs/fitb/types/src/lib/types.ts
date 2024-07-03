export type FormDataPointer =
  | 'name'
  | 'labelType'
  | 'labelCurrency'
  | 'labelTextPrefix'
  | 'labelTextSuffix';

export type InputField = {
  placeholder: string;
  default: null | string;
  type: 'input';
};

export type SelectField = {
  placeholder: string;
  default: null | string;
  type: 'select-with-options';
  options: { name: string; value: string }[];
};

export type FormDataConfig = {
  name: InputField;
  labelType: SelectField & {
    default: 'no-label' | 'currency' | 'custom-label';
  };
  labelCurrency: SelectField;
  labelTextPrefix: InputField;
  labelTextSuffix: InputField;
};

export interface WidgetConfig {
  formData: FormDataConfig;
  formDataFillInTheBlanks: {
    data: WidgetNodeData[];
  };
}

export interface WidgetNode {
  type: 'text' | 'fieldControl';
  data?: string;
  formDataPointer?: FormDataPointer;
  validators?: { type: string }[];
  filter?: { $in: ('currency' | 'custom-label')[] };
  nodes?: Pick<WidgetNode, 'filter' | 'children'>[];
  children?: WidgetNodeData[];
}

export type WidgetNodeData = Omit<WidgetNode, 'filter' | 'children'>;

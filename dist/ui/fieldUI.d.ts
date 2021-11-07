/// <reference types="react" />
export declare type FieldUIType = 'form' | 'arr' | 'group' | 'button' | 'submit' | 'custom' | 'image' | 'id' | 'string' | 'textarea' | 'password' | 'date' | 'datetime' | 'select' | 'url' | 'email' | 'updown' | 'number' | 'color' | 'checkbox' | 'checkboxes' | 'radio' | 'range' | 'tagSingle' | 'tagMulti';
export interface FieldUI {
    widget?: FieldUIType;
    readOnly?: boolean;
    disabled?: boolean;
    visible?: boolean;
    label?: string;
    labelHide?: boolean;
    className?: string;
    Templet?: FieldUITempletType;
    discription?: (string | JSX.Element | (() => JSX.Element));
    discriptionClassName?: string;
    defaultValue?: any;
}
export interface FieldUIImage extends FieldUI {
    widget: 'image';
    size: 'sm' | 'lg';
}
export interface FieldUIId extends FieldUI {
    widget: 'id';
    placeholder?: string | JSX.Element;
}
export interface FieldUIInput extends FieldUI {
    placeholder?: string;
}
export interface FieldUIString extends FieldUIInput {
    widget: 'string';
}
export interface FieldUITextArea extends FieldUIInput {
    widget: 'textarea';
    rows?: number;
}
export interface FieldUIPassword extends FieldUIInput {
    widget: 'password';
}
export interface FieldUIRange extends FieldUIInput {
    widget: 'range';
    min?: number;
    max?: number;
    step?: number;
}
export interface FieldUINumber extends FieldUIInput {
    widget: 'number';
    min?: number;
    max?: number;
    step?: number;
}
export interface FieldUICheck extends FieldUI {
    widget: 'checkbox';
    trueValue?: any;
    falseValue?: any;
}
export interface FieldUISelectList {
    value: any;
    title: string;
}
export interface FieldUISelectBase extends FieldUI {
}
export interface FieldUISelect extends FieldUISelectBase {
    widget: 'select';
}
export interface FieldUIRadio extends FieldUISelectBase {
    widget: 'radio';
}
export interface FieldUITag extends FieldUI {
    widget: 'tagSingle' | 'tagMulti';
    wrapClassName?: string;
}
export interface FieldUITagSingle extends FieldUITag {
    widget: 'tagSingle';
}
export interface FieldUITagMulti extends FieldUITag {
    widget: 'tagMulti';
}
export interface FieldUICollection {
    [field: string]: FieldUI;
}
export declare type FieldUITempletType = ((item?: any) => JSX.Element) | JSX.Element;
export interface FieldUIGroup extends FieldUI {
    widget: 'group';
    with: string[];
}
export interface FieldUIButton extends FieldUI {
    widget: 'button';
}

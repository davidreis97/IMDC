import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {

  whiteCSS: string = `
  /** primary **/
  --ion-color-primary: #3880ff;
  --ion-color-primary-rgb: 56, 128, 255;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #3171e0;
  --ion-color-primary-tint: #4c8dff;

  /** secondary **/
  --ion-color-secondary: #0cd1e8;
  --ion-color-secondary-rgb: 12, 209, 232;
  --ion-color-secondary-contrast: #ffffff;
  --ion-color-secondary-contrast-rgb: 255, 255, 255;
  --ion-color-secondary-shade: #0bb8cc;
  --ion-color-secondary-tint: #24d6ea;

  /** tertiary **/
  --ion-color-tertiary: #7044ff;
  --ion-color-tertiary-rgb: 112, 68, 255;
  --ion-color-tertiary-contrast: #ffffff;
  --ion-color-tertiary-contrast-rgb: 255, 255, 255;
  --ion-color-tertiary-shade: #633ce0;
  --ion-color-tertiary-tint: #7e57ff;

  /** success **/
  --ion-color-success: #10dc60;
  --ion-color-success-rgb: 16, 220, 96;
  --ion-color-success-contrast: #ffffff;
  --ion-color-success-contrast-rgb: 255, 255, 255;
  --ion-color-success-shade: #0ec254;
  --ion-color-success-tint: #28e070;

  /** warning **/
  --ion-color-warning: #ffce00;
  --ion-color-warning-rgb: 255, 206, 0;
  --ion-color-warning-contrast: #ffffff;
  --ion-color-warning-contrast-rgb: 255, 255, 255;
  --ion-color-warning-shade: #e0b500;
  --ion-color-warning-tint: #ffd31a;

  /** danger **/
  --ion-color-danger: #f04141;
  --ion-color-danger-rgb: 245, 61, 61;
  --ion-color-danger-contrast: #ffffff;
  --ion-color-danger-contrast-rgb: 255, 255, 255;
  --ion-color-danger-shade: #d33939;
  --ion-color-danger-tint: #f25454;

  /** dark **/
  --ion-color-dark: #222428;
  --ion-color-dark-rgb: 34, 34, 34;
  --ion-color-dark-contrast: #ffffff;
  --ion-color-dark-contrast-rgb: 255, 255, 255;
  --ion-color-dark-shade: #1e2023;
  --ion-color-dark-tint: #383a3e;

  /** medium **/
  --ion-color-medium: #989aa2;
  --ion-color-medium-rgb: 152, 154, 162;
  --ion-color-medium-contrast: #ffffff;
  --ion-color-medium-contrast-rgb: 255, 255, 255;
  --ion-color-medium-shade: #86888f;
  --ion-color-medium-tint: #a2a4ab;

  /** light **/
  --ion-color-light: #f4f5f8;
  --ion-color-light-rgb: 244, 244, 244;
  --ion-color-light-contrast: #000000;
  --ion-color-light-contrast-rgb: 0, 0, 0;
  --ion-color-light-shade: #d7d8da;
  --ion-color-light-tint: #f5f6f9;

  --ion-background-color: #ffffff;
  --ion-background-color-rgb: 255,255,255;

  --ion-text-color: #000000;
  --ion-text-color-rgb: 0,0,0;

  --ion-color-step-50: #f2f2f2;
  --ion-color-step-100: #e6e6e6;
  --ion-color-step-150: #d9d9d9;
  --ion-color-step-200: #cccccc;
  --ion-color-step-250: #bfbfbf;
  --ion-color-step-300: #b3b3b3;
  --ion-color-step-350: #a6a6a6;
  --ion-color-step-400: #999999;
  --ion-color-step-450: #8c8c8c;
  --ion-color-step-500: #808080;
  --ion-color-step-550: #737373;
  --ion-color-step-600: #666666;
  --ion-color-step-650: #595959;
  --ion-color-step-700: #4d4d4d;
  --ion-color-step-750: #404040;
  --ion-color-step-800: #333333;
  --ion-color-step-850: #262626;
  --ion-color-step-900: #191919;
  --ion-color-step-950: #0d0d0d;
  `;


  darkCSS : string = `
  --ion-background-color: #111111 !important;
  --ion-background-color-rgb: 17,17,17 !important;

  --ion-text-color: #ffffff !important;
  --ion-text-color-rgb: 255,255,255 !important;

  --ion-color-step-50: #1d1d1d !important;
  --ion-color-step-100: #292929 !important;
  --ion-color-step-150: #353535 !important;
  --ion-color-step-200: #414141 !important;
  --ion-color-step-250: #4d4d4d !important;
  --ion-color-step-300: #585858 !important;
  --ion-color-step-350: #646464 !important;
  --ion-color-step-400: #707070 !important;
  --ion-color-step-450: #7c7c7c !important;
  --ion-color-step-500: #888888 !important;
  --ion-color-step-550: #949494 !important;
  --ion-color-step-600: #a0a0a0 !important;
  --ion-color-step-650: #acacac !important;
  --ion-color-step-700: #b8b8b8 !important;
  --ion-color-step-750: #c4c4c4 !important;
  --ion-color-step-800: #cfcfcf !important;
  --ion-color-step-850: #dbdbdb !important;
  --ion-color-step-900: #e7e7e7 !important;
  --ion-color-step-950: #f3f3f3 !important;

  /** light **/
  --ion-color-light: #222428 !important;
  --ion-color-light-rgb: 34, 34, 34 !important;
  --ion-color-light-contrast: #ffffff !important;
  --ion-color-light-contrast-rgb: 255, 255, 255 !important;
  --ion-color-light-shade: #1e2023 !important;
  --ion-color-light-tint: #383a3e !important;

  /** dark **/
  --ion-color-dark: #f4f5f8 !important;
  --ion-color-dark-rgb: 244, 244, 244 !important;
  --ion-color-dark-contrast: #000000 !important;
  --ion-color-dark-contrast-rgb: 0, 0, 0 !important;
  --ion-color-dark-shade: #d7d8da !important;
  --ion-color-dark-tint: #f5f6f9 !important;

  --card-background: var(--ion-color-step-50) !important;
  --alert-color: var(--ion-color-step-50) !important;
  `;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  setDarkTheme(){
    this.document.documentElement.style.cssText = this.whiteCSS + this.darkCSS;
  }

  setWhiteTheme(){
    this.document.documentElement.style.cssText = this.whiteCSS;
  }
}

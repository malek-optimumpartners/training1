import { Page, Locator } from '@playwright/test';

export class LocatorObject {
  name: string;
  selector: string;
  locator: Locator;

  constructor(name: string, selector: string) {
    this.name = name;
    this.selector = selector;
  }
}
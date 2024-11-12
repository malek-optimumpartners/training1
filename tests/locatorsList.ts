import { Locator,Page } from "@playwright/test";
import { LocatorObject } from "./locatorObject";

export class LocatorsList {
    private pageModel: Page;
    private locators: { [key: string]: LocatorObject } = {};
  
    constructor(page: Page) {
      this.pageModel = page;
    }
    
  
    add(name: string, selector: string): void {
      let locatorObject = new LocatorObject(name, selector);
      locatorObject.locator=this.pageModel.locator(selector);
      this.locators[name] = locatorObject;
    }
  
    get(key: string): Locator {
      const locator = this.locators[key];
      return locator.locator;
    }
  
    addAll(objects: Record<string, string>) {
        for (const key in objects) {
            if (objects.hasOwnProperty(key)) {
                const value = objects[key];
                this.add(key,value);
            }
        }
    }
    
  }
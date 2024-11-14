export class SharedContext {
    public newEmployee: {
      id: string; 
      credentials: { username: string; password: string };
    };
  
    constructor() {
      this.newEmployee = {
        id: '0',
        credentials: { username: '', password: '' },
      };
    }
  }
  
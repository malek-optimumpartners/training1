export class Credential{
    public userName:string;
    public passWord:string;
    public credentialState:string;

    constructor(userName:string,passWord:string,credentialState:string){
        this.userName=userName;
        this.passWord=passWord;
        this.credentialState=credentialState;
    }
}
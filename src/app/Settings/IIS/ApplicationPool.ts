export interface ApplicationPool
{
    key:string;
    name:string;    
    status:string,
    netCLRVersion:string;
    managedPipeLineMode:string;
    identity:string;
    applications:number;        
    isStarted:boolean;
}

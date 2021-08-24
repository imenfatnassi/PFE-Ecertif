export interface IIteration {
    (name : string, value : string | number) : void;
}

export class EnumUtils {
    private static EXPRESSION = /^[0-9]+$/g;

    public static iterate<T>(type : T, iteration : IIteration) {

        for(let name in type) {
            if(name.match(this.EXPRESSION))
                continue;
    
            iteration(name, <any>type[name]);
        }
    }
}
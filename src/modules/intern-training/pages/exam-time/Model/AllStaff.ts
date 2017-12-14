
export class AllStaff {
    private ShortName:string;
    private FullName:string;
    private EmailAddress:string;

    //构造方法
    constructor(ShortName:string,FullName:string,Email:string) {
        this.ShortName = ShortName;
        this.FullName = FullName;
        this.EmailAddress = Email;
    }

}
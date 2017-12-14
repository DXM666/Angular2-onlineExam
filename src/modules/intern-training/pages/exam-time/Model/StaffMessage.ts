export class StaffMessage {
    private ShortName:string;
    private FullName:string;
    private Email:string;

    constructor(ShortName:string,FullName:string,Email:string) {
        this.ShortName = ShortName;
        this.FullName = FullName;
        this.Email = Email;
    }

    get shortName() {
        return this.ShortName;
    }

    set shortName(val) {
        this.ShortName = val;
    }

    get fullName() {
        return this.FullName;
    }

    set fullName(val) {
        this.FullName = val;
    }
    get email() {
        return this.Email;
    }

    set email(val) {
        this.Email = val;
    }

}
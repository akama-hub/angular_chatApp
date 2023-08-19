export class User {

    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
    initial: string;

    constructor(user: firebase.default.User){
        this.uid = user.uid;
        this.displayName = user.displayName!;
        this.email = user.email!;
        this.photoURL = user.photoURL!;
        // 最初の一文字を受け取る
        this.initial = user.displayName!.slice(0, 1);
    }    
}

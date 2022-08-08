import { User } from "./user.model";

export class Reply {
    constructor(
        public content?: string,
        public replyingTo?: string,
        public user?: User
    ) { }
}

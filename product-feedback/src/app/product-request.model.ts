import { Comment } from "./comment.model";
import { Reply } from "./reply.model";

export class ProductRequest {
    constructor(
        public title?: string,
        public category?: string,
        public upvotes?: number,
        public status?: string,
        public comments?: Comment,
        public reply?: Reply
    ) { }
}

export class CommentDto {
    user: string;
    content: string;
    createdOn: string;
    section: string;
    parentId: string;
    replyingTo: string | null;
}
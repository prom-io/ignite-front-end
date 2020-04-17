import {observable, action} from "mobx";
import {CreateCommentStore} from "./CreateCommentStore";
import {axiosInstance} from "../../api/axios-instance";

const PAGE_SIZE = 100;

export class CommentsStore {
    @observable
    commentsByStatusesMap = {};

    @observable
    commentCreationListeners = [];

    @action
    fetchComments = statusId => {
        if (!this.commentsByStatusesMap[statusId]) {
            this.commentsByStatusesMap[statusId] = {
                pending: false,
                pagination: {
                    currentPage: 1
                },
                comments: [],
                commentCreation: new CreateCommentStore(statusId, comment => {
                    this.commentsByStatusesMap[comment.status_id].comments = [
                        ...this.commentsByStatusesMap[comment.status_id].comments,
                        comment
                    ];
                    this.commentCreationListeners.forEach(listener => listener(statusId, comment));
                }),
                expanded: true
            }
        }

        this.commentsByStatusesMap[statusId].pending = true;
        const page = this.commentsByStatusesMap[statusId].pagination.currentPage;

        axiosInstance.get(`/api/v1/statuses/${statusId}/comments?page=${page}&pageSize=${PAGE_SIZE}`)
            .then(({data}) => {
                this.commentsByStatusesMap[statusId].comments = [
                    ...this.commentsByStatusesMap[statusId].comments,
                    ...data.filter(comment => !this.commentsByStatusesMap[statusId].comments.map(existingComment => existingComment.id).includes(comment.id))
                ];

                if (data.length === PAGE_SIZE) {
                    this.commentsByStatusesMap[statusId].pagination.currentPage += 1;
                }
            })
            .finally(() => this.commentsByStatusesMap[statusId].pending = false);
    };

    @action
    setCommentsExpanded = (statusId, expanded) => {
        if (this.commentsByStatusesMap[statusId]) {
            this.commentsByStatusesMap[statusId] = {
                ...this.commentsByStatusesMap[statusId],
                expanded
            }
        }
    };

    @action
    addCommentCreationListener = commentCreationListener => {
        this.commentCreationListeners.push(commentCreationListener);
    }
}

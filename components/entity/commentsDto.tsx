export type CommentDataset = {
    id: number;
    product_id: number;
    data: {
        rate_avg: string;
        likes_max: string;
        likes_count: string;
        likes_grouped: {
            sum: {
                likes_zero: number;
                likes_nonZero: number;
            };
            count: {
                likes_zero: number;
                likes_nonZero: number;
            };
        };
    };
    created_at: string;
};

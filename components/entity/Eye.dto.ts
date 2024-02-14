
export type EyeProduct= {
    userId: number;
    productId: number;
    productTitle: string;
    info?: string;
    pipelinesIds?: string;
    created_at?: Date;
    id?: number;
  }
export type EyeProductParams = {
    productId: number;
    productTitle: string;
    createdAt: Date;
    page: number;
    length: number;
  };
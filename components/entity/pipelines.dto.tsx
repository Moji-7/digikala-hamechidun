
export enum PipelineIds {
    COMMENTS = 1,
    OTHER_SELLERS = 2,
    SIMILARS = 3,
    TOROB = 4
}



export interface PipelineDetail {
    id: string;
    eyeProduct: string;
    lastStatus: string;
    runnedDate: string;
  }
  
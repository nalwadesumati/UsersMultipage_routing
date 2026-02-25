export interface Iproduct {
  pname: string;
  pid: string;
  pstatus:
    | 'In-progress'
    | 'Available'
    | 'Delivered'
    | 'Out of Stock'
    | 'Limited';
  canReturn: boolean;
  imgUrl: string;
}

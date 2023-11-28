export interface Book {
    bookid: number;
    title: string;
    imageUrl: string;
    description: string;
    category:string;
    price: number;
    quantity:number;
    rating:number;
    reviews: {
        reviewerName: string;
        reviewText: string;
      }[];
    noOfBooksSold:number;
    noOfBooksInStore:number;
    author:[]
}

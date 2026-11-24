export type Book = {id:string; title:string; authors:string[]; cover:string; description?:string; publishedDate?:string; infoLink?:string; amazonLink?:string};
export type Sale = {id:string; bookTitle:string; author:string; bookPrice:number; amountPaid:number; date:string; userEmail:string; type:'click'|'sale'};

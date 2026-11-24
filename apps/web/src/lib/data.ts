import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, where} from 'firebase/firestore';
import {db} from '../firebase'; import type {Book,Sale} from '../types';
export async function ensureUser(uid:string,email:string,displayName:string){const ref=doc(db,'users',uid);const snap=await getDoc(ref);if(!snap.exists())await setDoc(ref,{uid,email,displayName,role:'user',createdAt:serverTimestamp()},{merge:true});return (await getDoc(ref)).data();}
export async function getFavorites(uid:string):Promise<Book[]>{const q=query(collection(db,'users',uid,'favorites'),orderBy('savedAt','desc'));const s=await getDocs(q);return s.docs.map(d=>d.data() as Book);}
export async function saveFavorite(uid:string,b:Book){await setDoc(doc(db,'users',uid,'favorites',b.id),{...b,savedAt:serverTimestamp()});}
export async function removeFavorite(uid:string,id:string){await deleteDoc(doc(db,'users',uid,'favorites',id));}
export async function trackClick(uid:string,email:string,b:Book){await addDoc(collection(db,'salesHistory'),{bookTitle:b.title,author:b.authors.join(', '),bookPrice:0,amountPaid:0,date:new Date().toISOString(),userEmail:email,uid,type:'click',createdAt:serverTimestamp()});}
export async function addSale(uid:string,email:string,bookTitle:string,author:string,bookPrice:number,amountPaid:number){await addDoc(collection(db,'salesHistory'),{uid,userEmail:email,bookTitle,author,bookPrice,amountPaid,date:new Date().toISOString(),type:'sale',createdAt:serverTimestamp()});}
export async function getSales():Promise<Sale[]>{const q=query(collection(db,'salesHistory'),orderBy('createdAt','desc'),limit(300));const s=await getDocs(q);return s.docs.map(d=>({id:d.id,...d.data()} as Sale));}

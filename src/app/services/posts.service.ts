import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  BASE_URL: string = environment.BASE_URL;
  POST_URL: string = `${this.BASE_URL}/posts.json`;

  constructor(private _http: HttpClient) {}

  fetchPosts(): Observable<any> {
    return this._http.get<any>(this.POST_URL).pipe(
      map((obj) => {
        let postsArr: Array<Ipost> = [];
        for (const key in obj) {
          postsArr.push({ ...obj[key], postId: key });
        }
      }),
    );
  }
}

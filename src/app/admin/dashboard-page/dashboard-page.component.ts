import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  pSup: Subscription
  dSup: Subscription
  searchStr = ''

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.pSup = this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  ngOnDestroy() {
    if (this.pSup) {
      this.pSup.unsubscribe()
    }
    if (this.dSup) {
      this.dSup.unsubscribe()
    }
  }

  remove(id: string) {
    this.dSup = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
    })
  }
}

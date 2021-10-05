import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
    
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
     
  posts: Post[] = [];
   
  constructor(public postService: PostService) { }
    
  ngOnInit(): void {
    this.getAllpost();
  }

   getAllpost() {
    this.postService.getAll().subscribe((data: Post[])=>{
      this.posts = data;
      console.log(this.posts);
    })  
  }
    
 
  
}
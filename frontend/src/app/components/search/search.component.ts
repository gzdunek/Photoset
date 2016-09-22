import {SearchService} from "../../services/search.service";
import {Component} from "@angular/core";
import {User} from "../../models/user";
import {Router} from "@angular/router";
@Component({
  selector: 'search',
  providers: [SearchService],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {


  constructor(private searchService: SearchService, private router: Router) {
  }

  user: any;

  results: User[];

  search(event) {
    this.searchService.searchUser(event.query).subscribe(users => {
      this.results = users;
    });
  }

  navigateToUserByUsername(username: string) {
    this.router.navigate(['/user', username]);
  }
}

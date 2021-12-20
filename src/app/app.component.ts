import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'AppUser';
  users: any[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo)  { }

  ngOnInit(): void {
    const getUsers = gql`
    query{
      users {
          id
          lastname
          name
          email
        }
    }`;
    this.apollo
    .watchQuery({
      query: getUsers,
      fetchPolicy: 'network-only'
    })
    .valueChanges.pipe(map( (result:any) => {
      return result.data.users;
    })).subscribe( (datos) => {
      this.users = datos;
      console.log (datos)
    });
  }
}

/*.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      console.log (data);
    //  this.users = data.users;

    })

*/

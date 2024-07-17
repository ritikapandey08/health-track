import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

interface Workout {
  type: string;
  minutes: number;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['name', 'workouts'];
  dataSource = new MatTableDataSource<User>(this.users);
  searchTerm = '';
  filterType = '';
  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.applyFilter();
  }

  fetchUsers() {
    this.users = this.userService.getUsers();
    this.dataSource.data = this.users;
    this.dataSource.paginator = this.paginator; // Assign paginator to data source
  }

  applyFilter() {
    let filteredUsers = this.users;

    if (this.searchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.filterType) {
      filteredUsers = filteredUsers.filter(user =>
        user.workouts.some(workout => workout.type === this.filterType)
      );
    }

    this.dataSource.data = filteredUsers;
  }
}

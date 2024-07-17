import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    }
  ];

  constructor() { }

  getUsers() {
    return this.users;
  }

  addUser(user: any) {
    this.users.push(user);
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('userData', JSON.stringify(this.users));
  }
}

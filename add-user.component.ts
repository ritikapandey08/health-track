import { Component } from '@angular/core';
import { UserService } from '../user.service'; // Import UserService

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userName = '';
  workoutType = '';
  workoutMinutes = 0;
  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga']; // Array of workout types

  constructor(private userService: UserService) {}

  addUser() {
    const newUser = {
      id: Date.now(), // Generate a unique ID (you can use a different method for production)
      name: this.userName,
      workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }]
    };
    this.userService.addUser(newUser); // Call the addUser method from UserService to store the user
  }
}

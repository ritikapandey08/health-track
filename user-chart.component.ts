import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.css']
})
export class UserChartComponent implements OnInit, AfterViewInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Component initialization logic
  }

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  initializeChart() {
    const users = this.userService.getUsers();

    // Prepare data for the chart
    const workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];
    const workoutData = workoutTypes.map(type => {
      return users.reduce((total, user) => {
        return total + user.workouts
          .filter(workout => workout.type === type)
          .reduce((sum, workout) => sum + workout.minutes, 0);
      }, 0);
    });

    const ctx = document.getElementById('userChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: workoutTypes,
        datasets: [{
          label: 'Workout Minutes',
          data: workoutData,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

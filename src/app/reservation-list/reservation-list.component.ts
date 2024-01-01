import { Component, OnInit } from '@angular/core';
import { MockService } from '../reservation/mock.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  constructor(private mockService: MockService) {
  }
  
  ngOnInit(): void {
    this.mockService.getReservations().subscribe(reservations =>  {
      this.reservations = reservations
    });
  }

  deleteReservation(id: string) {
    this.mockService.removeReservation(id).subscribe(() => {
      console.log("Delete request got processed");
      }   
    );
  }

}

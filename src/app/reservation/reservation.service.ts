import { Injectable, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(){
    let savedReservations = localStorage.getItem("reservations");
    this.reservationList = savedReservations? JSON.parse(savedReservations) : [];
  }
  
  reservationList: Reservation[] = [];
  getReservations(): Reservation[]{
    return this.reservationList;
  }

  getReservationById(id: string): Reservation | undefined {
      return this.reservationList.find(s => s.id === id);
  }

  addReservation(reservation: Reservation): void {
    this.reservationList.push(reservation);
    this.updateStorage();
  }

  removeReservation(id: string): void {
    this.reservationList.splice(this.reservationList.findIndex(s => s.id === id), 1);
    this.updateStorage();
  }

  updateReservation(reservation: Reservation): void {
    let index = this.reservationList.findIndex(s => s.id === reservation.id);
    this.reservationList[index] = reservation;
    this.updateStorage();
  }

  private updateStorage(){
    localStorage.setItem("reservations", JSON.stringify(this.reservationList));
  }

}

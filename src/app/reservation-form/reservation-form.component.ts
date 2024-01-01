import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MockService } from '../reservation/mock.service';
import { Reservation } from '../models/reservation';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';


@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  ngOnInit(): void {
    
  }
  reservationForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, 
    private mockService: MockService, 
    private router: Router,
    private activatedRoute: ActivatedRoute){
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.mockService.getReservationById(id).subscribe(reservation => {
        if(reservation) {
          this.reservationForm.patchValue(reservation);
        }  
      });         
    }
  }
  
  onSubmit() {
    
    if(this.reservationForm.valid){
      
      let newRes: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if(id) {
        newRes.id = id;
        this.mockService.updateReservation(newRes).subscribe(() => {});
      }
      else {
        newRes.id = Guid.create().toString();
        this.mockService.addReservation(newRes).subscribe(() => {});
      }
      this.router.navigate(['/list']);
    }
    //this.reservationService.value["guestName"] == the guest Name from form
  }
}

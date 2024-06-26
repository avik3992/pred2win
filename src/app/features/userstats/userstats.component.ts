import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { map, take } from 'rxjs';
import { UserstatService } from './services/userstatservices';
import { UserstatsMaterialModule } from './userstats-material.module';
import { User } from "../../store/auth/types";
import { AuthStoreService } from 'src/app/store/auth/auth-store.service';

@Component({
  selector: 'app-userstats',
  templateUrl: './userstats.component.html',
  styleUrls: ['./userstats.component.scss']
})
export class UserstatsComponent implements OnInit {
    tournamentId = 'focomeeuro24';
    userStats: any;
    loading = false;
    error: string | undefined;
    userId: string | null = null;

    constructor(
        private userstatService: UserstatService,
        private route: ActivatedRoute,
        private router: Router, 
        private authStoreService: AuthStoreService,
        private location: Location
        ) {}

        ngOnInit(): void {
          this.route.params.pipe(
              map(params => params['userId']),
              take(1) 
          ).subscribe(userId => {
              this.userId = userId;
              if (userId) {
                  this.fetchUserStats(userId);
              }
          });
      }
      
          fetchUserStats(userId: string) {
            this.loading = true;
            this.error = undefined;
      
            this.userstatService.userstats(userId, this.tournamentId)
              .subscribe(
                (userStats) => {
                  this.userStats = userStats;
                },
                (error) => {
                  this.error = error;
                },
                () => {
                  this.loading = false;
                }
              );
          }

          onClose() {
            this.location.back()
        }
  }

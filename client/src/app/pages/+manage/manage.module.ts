import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import { MoviesComponent } from '../movies/movies.component';
import { NavVComponent } from '../../components/nav-v/nav.component';
import { TableModule } from '../../components/table/table.module';
import { CardModule } from '../../components/card/card.module';
import { DateFormat } from './date.pipe';
import { MovieService } from '../movies/movies.service';

@NgModule({
  imports: [CommonModule, FormsModule, TableModule, CardModule, ManageRoutingModule],
  declarations: [ManageComponent, MoviesComponent, NavVComponent, DateFormat],
  providers: [MovieService]
})
export class ManageModule {}

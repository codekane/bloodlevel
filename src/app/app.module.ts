import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LevelChartComponent } from './level-chart/level-chart.component';
import { NewDoseFormComponent } from './forms/new-dose-form/new-dose-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
//import { MatSidenavModule } from '@angular/materials/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from  '@angular/material/tree';

// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Material Data Tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

// DateTime Picker
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OldDoseFormComponent } from './forms/old-dose-form/old-dose-form.component';

import { BloodLevelService } from './services/blood-level.service';
import { DataService } from './services/data.service';
import { Version1Component } from './version1/version1.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: Version1Component, pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    LevelChartComponent,
    NewDoseFormComponent,
    DashboardComponent,
    OldDoseFormComponent,
    Version1Component,
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, RouterModule.forRoot(routes),
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule,
    MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule,
    MatMenuModule, MatToolbarModule, MatCardModule, MatDividerModule, MatExpansionModule, MatGridListModule,
    MatListModule, MatStepperModule, MatTabsModule, MatTreeModule, MatButtonModule, MatButtonToggleModule,
    MatBadgeModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule,
    MatBottomSheetModule, MatDialogModule, MatSnackBarModule, MatTooltipModule, MatPaginatorModule,
    MatSortModule, MatTableModule,
    NgxMatDatetimePickerModule, NgxMatTimepickerModule

  ],
  exports: [
    BrowserModule, HttpClientModule, AppRoutingModule, RouterModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule,
    MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatToolbarModule,
    MatCardModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatListModule, MatStepperModule,
    MatTabsModule, MatTreeModule, MatButtonModule, MatButtonToggleModule, MatBadgeModule, MatChipsModule,
    MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatBottomSheetModule, MatDialogModule,
    MatSnackBarModule, MatTooltipModule, MatPaginatorModule, MatSortModule, MatTableModule,
    NewDoseFormComponent, NgxMatDatetimePickerModule, NgxMatTimepickerModule,
    OldDoseFormComponent, Version1Component

  ],
  providers: [BloodLevelService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

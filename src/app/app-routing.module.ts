import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadCsvComponent } from './components/upload-csv/upload-csv.component';

const routes: Routes = [
  {
    path:'',
    component:UploadCsvComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildTableComponent } from './components/child-table/child-table.component';
import { MainTableComponent } from './components/main-table/main-table.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ChildTableComponent,
		MainTableComponent,
		HeaderComponent,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}

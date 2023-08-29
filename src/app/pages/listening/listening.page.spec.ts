import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ListeningPage } from './listening.page';

describe('ListeningPage', () => {
  let component: ListeningPage;
  let fixture: ComponentFixture<ListeningPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(ListeningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

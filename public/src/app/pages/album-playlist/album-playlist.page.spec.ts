import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlbumPlaylistPage } from './album-playlist.page';

describe('AlbumPlaylistPage', () => {
  let component: AlbumPlaylistPage;
  let fixture: ComponentFixture<AlbumPlaylistPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(AlbumPlaylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

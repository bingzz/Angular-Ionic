import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, RefresherCustomEvent } from '@ionic/angular';
import { Observable, debounceTime, distinctUntilChanged, of } from 'rxjs';
import { Album } from 'src/app/models/models';
import { DataService } from 'src/app/services/data.service';
import { OverlayEventDetail } from '@ionic/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayService } from 'src/app/services/overlay.service';
import { randomizer } from 'src/app/constants/constants';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  skeletonItemLength = 0;
  loaded: boolean = false;
  notFound: boolean = false;

  albums$: Observable<Album[]>;
  albumForm: FormGroup;

  @ViewChild(IonModal) addAlbumModal!: IonModal;

  constructor (private dataService: DataService, private formBuilder: FormBuilder, private overlayService: OverlayService) {
    this.albums$ = dataService.albums$.asObservable();
    this.albumForm = this.formBuilder.group({
      albumName: ['', Validators.required],
      img: null
    });
  }

  ngOnInit(): void {
    this.skeletonItemLength = randomizer(3, 7);
    this.getAlbums();
    console.log('getAlbums');

  }

  getAlbums() {
    this.dataService.getUserAlbums()
      .then(response => {
        this.loaded = response;
      });
  }

  async addAlbum() {
    if (!this.albumForm.valid) return;

    const loading = await this.overlayService.createLoading('Adding Album...');
    loading.present();

    this.dataService.addUserAlbum(this.albumForm.value)
      .then(response => {
        if (!response) return;

        loading.dismiss();
        this.addAlbumModal.dismiss(null, 'confirm');
      });
  }

  refreshAlbums(event: Event) {
    const ev = event as RefresherCustomEvent;
    this.dataService.getUserAlbums()
      .then(() => {
        ev.target.complete();
      });

  }

  searchAlbums(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase().trim() ?? '';

    this.dataService.albums$.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe(data => {
        this.albums$ = of(data.filter(album => album.albumName.toLowerCase().indexOf(value) > -1));
      });
  }

  selectAlbum(album: Album) {
    console.log(album);

    // redirect to this url /home/library/<album_name>
    // if (!Object.keys(album).length) return;

    // this.router.navigate(['/home/library/', `${album.id}/`], {
    //   queryParams: album
    // });
  }

  deleteAlbum(album: string) {

  }

  updateAlbum(album: string) {

  }

  dismissCreateAlbum(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  cancelAddAlbum() {
    this.addAlbumModal.dismiss(null, 'cancel');
  }

  get skeletonItems() {
    return Array(this.skeletonItemLength);
  }
}

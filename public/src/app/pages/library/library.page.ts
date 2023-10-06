import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, RefresherCustomEvent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Album } from 'src/app/models/models';
import { AsyncService } from 'src/app/services/async.service';
import { DataService } from 'src/app/services/data.service';
import { OverlayEventDetail } from '@ionic/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  baseAlbums: Album[] = [];
  albums: Album[] = [];
  notFound: boolean = false;
  albums$: Observable<Album[]>;
  albumForm: FormGroup;

  @ViewChild(IonModal) addAlbumModal!: IonModal;

  constructor (private asyncService: AsyncService, private router: Router, private dataService: DataService, private formBuilder: FormBuilder) {
    this.albums$ = dataService.albums$.asObservable();

    this.albumForm = this.formBuilder.group({
      albumName: ['', Validators.required],
      img: null
    });
  }

  generateAlbums() {
    const count = this.baseAlbums.length + 1;

    for (let i = 0; i < 20; i++) {
      this.baseAlbums.push({
        id: `${count + i}`,
        name: 'Album ' + (count + i),
        img: 'https://picsum.photos/150/150?random=' + i
      });
    }

    this.albums = this.baseAlbums;
  }

  refreshAlbums(event: Event) {
    const ev = event as RefresherCustomEvent;

    setTimeout(() => {
      this.generateAlbums();
      ev.target.complete();

      console.log('Albums refreshed');
    }, 1500);
  }

  filterAlbums(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase().trim() ?? '';

    this.albums = this.baseAlbums.filter(album => album.name.toLowerCase().indexOf(value) > -1);
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

  addAlbum() {
    this.addAlbumModal.dismiss(null, 'confirm');
    this.dataService.addUserAlbum();
  }

  ngOnInit(): void {
    // this.dataService.getUserAlbums();
  }
}

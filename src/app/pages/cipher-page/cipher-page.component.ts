import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { CipherService } from 'src/app/services/cipher/cipher.service';

@Component({
  selector: 'app-cipher-page',
  templateUrl: './cipher-page.component.html',
  styleUrls: ['./cipher-page.component.scss']
})
export class CipherPageComponent implements OnInit {
  protected ngUnsubscribe = new Subject<void>();  // using Best Practice For Unsubscribing



  id: string = null;
  decrypt: boolean = true;
  encryptedId: string = null;
  decryptedId: string = null;

  constructor(
    private route: ActivatedRoute,
    private cipherService: CipherService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'] + '';
    this.encryptedId = this.cipherService.encrypt(this.id);

    combineLatest(this.route.params, this.route.queryParams).pipe(
      map(results => ({ params: results[0], queryParams: results[1] })),
      takeUntil(this.ngUnsubscribe)).subscribe(results => {
        this.id = results.params['id'] + '';  // + for convert to a number
        this.encryptedId = this.cipherService.encrypt(this.id);
      });
  }

  ngOnDestroy(): void {
    // using Best Practice For Unsubscribing
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}

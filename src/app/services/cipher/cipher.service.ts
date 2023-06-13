import { Injectable } from '@angular/core';
// import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';


const OPTION = {
  // mode: CryptoJS.mode.ECB,
};

const KEY = environment.spreadsheetsIdCipherKey;
@Injectable({
  providedIn: 'root'
})
export class CipherService {

  constructor() { }

  encrypt(origText: string, password: string = KEY) {

    var ciphertext = AES.encrypt(origText, password, OPTION).toString();

    return this.utf8ToHex(ciphertext);
  }

  decrypt(ciphertext: string, password: string = KEY) {
    const utf8CipherText = this.hexToUtf8(ciphertext)
    if (utf8CipherText) {
      var bytes = AES.decrypt(utf8CipherText, password, OPTION);
      var originalText = bytes.toString(Utf8);
      return originalText;
    }
    return null;
  }


  private utf8ToHex(str: string) {
    return Array.from(str).map(c =>
      c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) :
        encodeURIComponent(c).replace(/\%/g, '').toLowerCase()
    ).join('');
  }
  private hexToUtf8(hex: string) {
    try {
      return decodeURIComponent('%' + hex.match(/.{1,2}/g).join('%'));
    } catch (err) {
      if (err instanceof URIError) return null;
    }

  }

}

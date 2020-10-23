import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class Security {

    key="$2y$10$dNn.mFm.3KAyYplSwkhrBOhvHaaKysugQCFMD0VEe2.SIokrvkuT2";
  constructor() { 
  }


 decrypt(encryptedString) {
     var json = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encryptedString)));

     var salt = CryptoJS.enc.Hex.parse(json.salt);
     var iv = CryptoJS.enc.Hex.parse(json.iv);

     var encrypted = json.ciphertext;// no need to base64 decode.

     var iterations = parseInt(json.iterations);
     if (iterations <= 0) {
         iterations = 999;
     }
     var encryptMethodLength = (256/4);// example: AES number is 256 / 4 = 64
     var hashKey = CryptoJS.PBKDF2(this.key, salt, {'hasher': CryptoJS.algo.SHA512, 'keySize': (encryptMethodLength/8), 'iterations': iterations});

     var decrypted = CryptoJS.AES.decrypt(encrypted, hashKey, {'mode': CryptoJS.mode.CBC, 'iv': iv});

     return decrypted.toString(CryptoJS.enc.Utf8);
 }

 encrypt(string) {
     var iv = CryptoJS.lib.WordArray.random(16);// the reason to be 16, please read on `encryptMethod` property.

     var salt = CryptoJS.lib.WordArray.random(256);
     var iterations = 999;
     var encryptMethodLength = (256/4);// example: AES number is 256 / 4 = 64
     var hashKey = CryptoJS.PBKDF2(this.key, salt, {'hasher': CryptoJS.algo.SHA512, 'keySize': (encryptMethodLength/8), 'iterations': iterations});

     var encrypted = CryptoJS.AES.encrypt(string, hashKey, {'mode': CryptoJS.mode.CBC, 'iv': iv});
     var encryptedString = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

     var output = {
         'ciphertext': encryptedString,
         'iv': CryptoJS.enc.Hex.stringify(iv),
         'salt': CryptoJS.enc.Hex.stringify(salt),
         'iterations': iterations
     };

     return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(output)));
 }


}

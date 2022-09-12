import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
// import { OrderSide } from 'opensea-js/lib/types';
import axios from 'axios';
// import { OrderModel } from 'src/common/openseaUtils/OpenseaModels';
// import { NetMode } from 'src/common/enum/index';
import { OS_APIKEY, NETWORK } from 'src/config';

// const NullAddress = '0x0000000000000000000000000000000000000000';

// const Web3 = require('web3');
// const opensea = require('opensea-js');
// const OpenSeaPort = opensea.OpenSeaPort;
// const Network = opensea.Network;
// const StopSchedule: boolean = false; //false;=======here

// const puppeteer = require("puppeteer");
import * as puppeteer from "puppeteer";

@Injectable()
export class NftDetailService {
  // public openseaReader: typeof OpenSeaPort;

  constructor() {
    // this.initOpenseaReader();
  }

  // Sleep (ms: number) {
  //   console.log("Sleep for " + ms + "ms");
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(undefined);
  //     }, ms);
  //   });
  // };

  async getOneAssetFromOpenSea(tokenId: string, tokenAddr: string){
    //* this must be called at frontend
  
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://api.opensea.io/api/v1/asset/${tokenAddr}/${tokenId}/`,
          {
            headers: {
              "x-api-key": OS_APIKEY,
            },
          }
        )
        .then((res) => {
          console.log(res.data)
          resolve(res.data);
        })
        .catch((ex) => {
          console.log(ex);
          reject(ex);
        });
    });
  }


  async scrapping(tokenId: string, tokenAddr: string): Promise<{ value: number, currency: string} | null | undefined> {

    const url = `https://opensea.io/assets/ethereum/${tokenAddr}/${tokenId}`;
    console.log('Opensea url:', url);
    let browser: puppeteer.Browser;
    try {
      browser = await puppeteer.launch({ 
        headless: false, 
         executablePath: "C:/\Program Files/\Google/\Chrome/\Application/\chrome.exe",
  
  
        // executablePath: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
      });
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(0); 
      await page.goto(url);
  
      const buttonSelector = "button";
      await page.waitForSelector(buttonSelector);
  
      let buttons = await page.evaluate((buttonSelector) => {
        const anchors = Array.from(document.querySelectorAll(buttonSelector));
        return anchors.map((anchor) => {
          if (anchor.textContent.includes("Buy")) {
            return anchor.textContent;
          }
          return null;
        });
      }, buttonSelector);
  
      buttons = buttons.filter((one) => one != null);
  
      console.log("buttons", buttons);
      let result: { value: number, currency: string} | null | undefined;

      if (buttons.length > 0) {
        console.log("This nft has active order: ");
  
        const verifySelector = ".VerificationIcon--icon";
        await page.waitForSelector(verifySelector);
  
        const verifyIcons = await page.evaluate((verifySelector) => {
          const anchors = Array.from(document.querySelectorAll(verifySelector));
          return anchors.map((anchor) => {
            return anchor.textContent;
          });
        }, verifySelector);
  
        console.log("verifiIcons", verifyIcons);
  
        if (verifyIcons.length > 0) {
          console.log("Verified collection:");
  
          const priceSelector = ".Price--amount";
          await page.waitForSelector(priceSelector);
  
          const prices = await page.evaluate((priceSelector) => {
            const anchors = Array.from(document.querySelectorAll(priceSelector));
            return anchors.map((anchor) => {
              return anchor.textContent;
            });
          }, priceSelector);
          console.log("prices", prices);

          const priceNumber = parseFloat(prices[0].trim());

          if (isNaN(priceNumber)) {
            const priceParts = prices[0].split(' ')
            result = {
              // asset,
              value:  parseFloat(priceParts[0]),
              currency: priceParts[1]
            }
          } else {
            result = {
              // asset: asset,
              value: priceNumber,
              currency: 'ETH'
            }
          }
          
        } else {
          console.log('this is not verified collection')
          throw new HttpException("No verified collection.", HttpStatus.FAILED_DEPENDENCY);
        }      
      } else {
        console.log("No active order.");
        throw new HttpException("No active order", HttpStatus.BAD_REQUEST);
      }
  
      await browser.close();
      return result;
    } catch (ex) {
      console.log("ex:", ex.message);
      await browser.close();
      throw new HttpException(ex.message, HttpStatus.NOT_FOUND);
    }
  }


}

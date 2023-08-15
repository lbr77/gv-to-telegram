import { Document } from 'parse5/dist/tree-adapters/default';
import { Environment,RequestBody } from './types';
import * as cheerio from 'cheerio'
const handler: ExportedHandler<Environment,null> = {
  async fetch(request: Request,environment:Environment): Promise<Response> {
    /**
       * Send Message to telegram.
       * @param {string} body The message to be sent.
       */
    async function sendMessage(
      body: string | undefined
    ): Promise<any>{
      const baseUrl = `https://api.telegram.org/bot${environment.TELEGRAM_TOKEN}/sendMessage?chat_id=${environment.TELEGRAM_USER_ID}`;
      if(body!=undefined){
        const response = await fetch(`${baseUrl}&text=${body}`);
        if((response.status === 201)) {
          return (await response.json())
        } else {
          const responseBody = await response.text();
          return responseBody;
        }
      }
    }
    /**
       * Send Document to telegram.
       * @param {string} body The message to be sent.
       */
    async function sendDocument(
      body: string | undefined
    ): Promise<any>{
      const baseUrl = `https://api.telegram.org/bot${environment.TELEGRAM_TOKEN}/sendMessage?chat_id=${environment.TELEGRAM_USER_ID}`;
      if(body!=undefined){
        const response = await fetch(`${baseUrl}&text=${body}`);
        if((response.status === 201)) {
          return (await response.json())
        } else {
          const responseBody = await response.text();
          return responseBody;
        }
      }
    }
    /**
     * Parse the target object.
     * @param {string} html from email;
     * @returns {string} parsed part from html;
     */
    // eslint-disable-next-line unicorn/consistent-function-scoping
    function ParseHTML(html: string | undefined): string{
      if(html==undefined){
        return "";
      }
      else{
        let $ = cheerio.load(html);
        return $("body > table > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(1) > td").text()
      }
    }
    const {method, url } = request;
    const {pathname} = new URL(url);
    try{
      if (method === "POST") {
        if(pathname=== environment.PATH){
          const requestBody = (await request.json()) as RequestBody;
          if(environment.AUTH === 'true'){
            await sendMessage(requestBody.plain);
          }
          else {
            await sendMessage(ParseHTML(requestBody.html));
          }
          return new Response("Success!");
        }
        return new Response("Not found.",{status:404});
      } else{
        return new Response(`The ${method} method is not allowed.`,{status:405});
      }
    }catch(error){
      return new Response(`Internal Server Error.\n${error}`,{status:500});
    }
  },
};

export default handler;
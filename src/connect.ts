import TendermintWS from './index';

const client:TendermintWS=new TendermintWS();

(async ()=> {
  try {
    await client.connect()
  }catch(e) {
    console.log(e)
  }
})();

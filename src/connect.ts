import TendermintWS from './tendermintws';

const client:TendermintWS = new TendermintWS();

(async ()=> {
  try {
    
    await client.connect()
    client.subscribe(["tm.event='NewBlock'"],(data) => { console.log(data)})
    client.subscribe(["tm.event='Tx'"],(data) => { console.log(data)})
    const txs= await client.call("tx_search",['tx.height>1',true,'1','30','asc'])
    console.log(txs);
    
  }catch(e) {
    console.log(e)
  }
})();

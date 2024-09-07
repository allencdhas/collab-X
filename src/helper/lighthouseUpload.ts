import lighthouse from "@lighthouse-web3/sdk";


async function sendLighthouse(title: string, description: string, artist:Array<string>, reward: string) {
    
    const apiKey = 'ef462be0.cc060b9905364ad7a9b5a5df1772d35b';

    const metadata = {
        "name": title,
        "description": description,
        "image": "ipfs://QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/images/cosmic_creatures.png",
        "artists": artist,
        "rewards": "0.1 ETH",
    };
    const metadataString = JSON.stringify(metadata);
    
    const res = await lighthouse.uploadText(
      metadataString,
      apiKey
    )
    console.log(res);

}

export default sendLighthouse;
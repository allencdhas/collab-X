import lighthouse from "@lighthouse-web3/sdk";


async function sendLighthouse(title: string, description: string, artist:Array<string>, reward: string) {

    const apiKey = 'ef462be0.cc060b9905364ad7a9b5a5df1772d35b';

    const metadata = {
        "name": title,
        "description": description,
        "image": "https://storage.googleapis.com/galadriel-assets/033dd10b-4af9-4518-b190-d19f5616e1f2.png",
        "artists": artist,
        "rewards": "0.1 ETH",
    };
    const metadataString = JSON.stringify(metadata);
    
    const res = await lighthouse.uploadText(
      metadataString,
      apiKey
    )
    console.log(res);
    return res;
    

}

export default sendLighthouse;
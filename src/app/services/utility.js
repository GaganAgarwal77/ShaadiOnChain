import { tokenURI } from "./web3";
import axios from 'axios';

export const getURI = async (tokenId) => {
    var uri = await tokenURI(tokenId);
    uri = uri.slice(7); 
    uri = uri.substring(0, uri.length - 14);
    uri = 'https://' + uri + '.ipfs.dweb.link/metadata.json';
    return uri
}  

export const uriToImageConverter = (uri) => {
    var image = uri.slice(7); 
    image = image.substring(0, image.length - 5);
    image = 'https://' + image + '.ipfs.dweb.link/blob';
    return image;
}

export const getImageFromTokenId = async (tokenId) => {
    const uri = await getURI(tokenId);
    const result = await axios(uri);
    const image = uriToImageConverter(result.data.image);
    return image;
}

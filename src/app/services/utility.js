import { tokenURI, tokenURILoveLetter, marriageCertificateTokenURI, tokenURITree } from "./web3";
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

export const getMetadataFromTokenId = async (tokenId) => {
    const uri = await getURI(tokenId);
    const result = await axios(uri);
    return result.data;
}

export const getLoveLetterImageFromTokenId = async (tokenId) => {
    var cid = await tokenURILoveLetter(tokenId);
    const image = 'https://' + cid + '.ipfs.dweb.link';
    return image;
}

export const getMarriageCertURI = async (tokenId) => {
    var uri = await marriageCertificateTokenURI(tokenId);
    uri = uri.slice(7); 
    uri = uri.substring(0, uri.length - 14);
    uri = 'https://' + uri + '.ipfs.dweb.link/metadata.json';
    return uri
}  

export const getImageFromMarriageCertTokenId = async (tokenId) => {
    const uri = await getMarriageCertURI(tokenId);
    const result = await axios(uri);
    const image = uriToImageConverter(result.data.image);
    return image;
}

export const getTreeImageFromTokenId = async (tokenId) => {
    const cid = await tokenURITree(tokenId);
    const image = getImageFromCID(cid);
    return image;
}

export const dataURItoBlob = (dataURI) => {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var bb = new Blob([ab], {type:'image/*'});
    return bb;
}

export const getGeneralContractURI = async (tokenUri) => {
    var uri = tokenUri;
    uri = uri.slice(7); 
    uri = uri.substring(0, uri.length - 14);
    uri = 'https://' + uri + '.ipfs.dweb.link/metadata.json';
    return uri
  }  
    
export const getMetadataFromGeneralContractTokenUri = async (tokenUri) => {
    const uri = await getGeneralContractURI(tokenUri);
    const result = await axios(uri);
    return result.data;
}
  
export const getImageFromCID = (tokenUriCID) => {
    return 'https://' + tokenUriCID + '.ipfs.dweb.link';
}  
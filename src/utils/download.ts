import { toPng } from 'html-to-image';
import JSZip from 'jszip';

// Download single card as image
export const downloadCardAsImage = async (element: HTMLElement, cardId: number) => {
  try {
    const dataUrl = await toPng(element, {
      quality: 0.95,
      backgroundColor: 'white',
    });
    
    const link = document.createElement('a');
    link.download = `bingo-card-${cardId}.jpg`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Error generating image:', error);
  }
};

// Download all cards as a zip file containing JPEGs
export const downloadAllCardsAsImages = async (elements: HTMLElement[]) => {
  try {
    const zip = new JSZip();
    
    // Create a promise for each card conversion
    const cardPromises = elements.map(async (element, index) => {
      const dataUrl = await toPng(element, {
        quality: 0.95,
        backgroundColor: 'white',
      });
      
      // Convert base64 to blob
      const base64Data = dataUrl.split(',')[1];
      const binaryData = atob(base64Data);
      const array = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        array[i] = binaryData.charCodeAt(i);
      }
      
      return {
        index: index + 1,
        blob: new Blob([array], { type: 'image/png' })
      };
    });
    
    // Wait for all conversions to complete
    const cards = await Promise.all(cardPromises);
    
    // Add each card to the zip file
    cards.forEach(({ index, blob }) => {
      zip.file(`bingo-card-${index}.jpg`, blob);
    });
    
    // Generate and download the zip file
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = 'christmas-bingo-cards.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error generating zip file:', error);
  }
};
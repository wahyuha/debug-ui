import imageCompression from 'browser-image-compression';

export function getBase64Size(base64Data) {
  const dLength = base64Data.length;
  const subpop = base64Data.substr(dLength - 2) === '==' ? 2 : 1;
  const size = (dLength * (3/4)) - subpop;
  return size;
}

export const resizeImage = async (file) => {
  const imageFile = file;

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 600,
    useWebWorker: false
  }

  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
    console.log(compressedFile);

    const compressed64 = imageCompression.getDataUrlFromFile(compressedFile);

    return compressed64;
  } catch (error) {
    console.log(error);
  }
}

export const fileToBase64WithEvent = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  console.log('nr A', reader);

  reader.addEventListener('load', (event) => {
    console.log(`File: ${file.name} read successfully`);

    const img = new Image();
    img.src = event.target.result;

    img.addEventListener("load", (img_e) => {
      console.log('nr B');
      const elem = document.createElement("canvas");

      const width = img.width > 600 ? 600 : img.width;
      const scaleFactor = width / img.width;
      const height = img.height * scaleFactor;
      elem.width = width;
      elem.height = height;
      let ctx = elem.getContext("2d");

      let imgQty = 0.5;
      ctx.drawImage(img_e.target, 0, 0, width, height);
      let result = ctx.canvas.toDataURL(img, "image/jpeg", imgQty);
      let modifiedSize = getBase64Size(result);
      console.log('sizeee :', modifiedSize);
      // console.log(result);

      if (modifiedSize > 500000) {
        let elem2 = document.createElement("canvas");
        let ctx2 = elem2.getContext("2d");
        let imgQty2 = 1;
        elem2.width = width;
        elem2.height = height;
        ctx2.drawImage(img_e.target, 0, 0, width, height);
        let result2 = ctx2.canvas.toDataURL(result, "image/jpeg", 0.5);
        let modifiedSize2 = getBase64Size(result2);
        console.log('size #2 :', modifiedSize2);
        // console.log(result2);

        ctx.drawImage(img, 0, 0, width, height,
        0, 0, elem.width * 0.5, elem.height * 0.5);
        let result3 = ctx2.canvas.toDataURL(img, "image/jpeg", 0.5);
        let modifiedSize3 = getBase64Size(result3);
        console.log('size #3 :', modifiedSize3);

        return resolve(result3);
      }
      return resolve(result);
    });

    img.addEventListener("error", (e) => {
      console.log('error img');
      console.error(e);
      reject(error)
    })
  });

  reader.addEventListener('error', () => {
    console.log('error reader');
    console.error(error)
    reject(error)
  });

  reader.readAsDataURL(file);
});


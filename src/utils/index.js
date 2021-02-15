export const fileToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log('info A', reader);

    reader.onload = event => {
      console.log('onload event', event);
      const img = new Image();
      img.src = event.target.result;
      (img.onload = () => {
        console.log('info B');
        const elem = document.createElement("canvas");

        const width = img.width > 600 ? 600 : img.width;
        const scaleFactor = width / img.width;
        const height = img.height * scaleFactor;
        const imgQty = 0.5;

        elem.width = width;
        elem.height = height;

        const ctx = elem.getContext("2d");
        console.log('info I');

        ctx.drawImage(img, 0, 0, width, height);
        console.log('info J');

        const result = ctx.canvas.toDataURL(img, "image/jpeg", imgQty);
        console.log('info K');
        return resolve(result);
      }),
      (reader.onerror = error => {
        console.log(error)
        reject(error)
      });
    };
  });

export function getBase64Size(base64Data) {
  const dLength = base64Data.length;
  const subpop = base64Data.substr(dLength - 2) === '==' ? 2 : 1;
  console.log('subpop ', subpop);
  const size = (dLength * (3/4)) - subpop;
  return size;
}

export const fileToBase64WithEvent = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  console.log('nr A', reader);

  reader.addEventListener('load', (event) => {
    console.log(`File: ${file.name} read successfully`);

    const img = new Image();
    img.src = event.target.result;

    img.addEventListener("load", () => {
      console.log('nr B');
      const elem = document.createElement("canvas");

      const width = img.width > 600 ? 600 : img.width;
      const scaleFactor = width / img.width;
      const height = img.height * scaleFactor;
      const imgQty = 0.5;

      elem.width = width;
      elem.height = height;

      const ctx = elem.getContext("2d");
      console.log('nr I');

      ctx.drawImage(img, 0, 0, width, height);
      console.log('nr J');

      const result = ctx.canvas.toDataURL(img, "image/jpeg", imgQty);
      console.log('nr K');

      console.log('sizeee :', getBase64Size(result));
      return resolve(result);
    });

    img.addEventListener("error", (e) => {
      console.log('error img');
      console.error(e);
    })
  });

  reader.addEventListener('error', () => {
    console.log('error reader');
    console.error(error)
    reject(error)
  });

  reader.readAsDataURL(file);
});

<script>
  import { getBase64Size, fileToBase64WithEvent, resizeImage } from "./utils/index";

  let uploader;
  let uploader2;
  let files;
  let fromPhoto = '';
  let fromPhotoB = '';

  const handleClick = () => {
    console.log('init click');
    uploader.click();
  };

  const handleClick2 = () => {
    console.log('init click 2');
    uploader2.click();
  };

  const handleImageChange = async () => {
    const file = files[0];
    
    try {
      console.log('try init s');
      const originSizebase64 = await fileToBase64WithEvent(file);
      fromPhoto = originSizebase64;
    } catch (error) {
      showModal = true;
      return;
    }
    console.log('file end');
  };

  const handleImageChangeB = async () => {
    const file = files[0];
    const comps = await resizeImage(file);
    fromPhotoB = comps;
  };
</script>
<div style={{ width: '100%' }}>
  <input
    type="file"
    accept="image/*"
    capture="camera"
    bind:this={uploader}
    bind:files
    on:change={e => handleImageChange(e)} />
  
  <button
    on:click={handleClick}
    >Test foto</button>

  <h2>Preview</h2>
  {#if fromPhoto}
  size : {getBase64Size(fromPhoto)}
  {/if}
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img src={fromPhoto} alt="photo" style={{ width: '100%' }} />
</div>
<div style={{ width: '100%' }}>
  <h2>Test B</h2>
  <input
    type="file"
    accept="image/*"
    capture="camera"
    bind:this={uploader2}
    bind:files
    on:change={e => handleImageChangeB(e)} />
  
  <button
    on:click={handleClick2}
    >Test foto</button>

  <h2>Preview B</h2>
  {#if fromPhotoB}
  size : {getBase64Size(fromPhotoB)}
  {/if}
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img src={fromPhotoB} alt="photo" style={{ width: '100%' }} />
</div>
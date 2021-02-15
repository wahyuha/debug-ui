<script>
  import { getBase64Size, fileToBase64WithEvent } from "./utils/index";

  let uploader;
  let files;
  let fromPhoto = '';

  const handleClick = () => {
    console.log('init click');
    uploader.click();
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
</script>

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

  <!-- <PageUpload {text} /> -->
  <h2>Preview</h2>
  {#if fromPhoto}
  size : {getBase64Size(fromPhoto)}
  {/if}
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img src={fromPhoto} alt="photo" style={{ width: '100%' }} />
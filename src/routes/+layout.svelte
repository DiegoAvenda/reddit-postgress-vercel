<script>
  import '../app.css'
  export let data
  import Navbar from '../lib/components/Navbar.svelte'
</script>

<Navbar imagen={data.fotos} />
<slot />

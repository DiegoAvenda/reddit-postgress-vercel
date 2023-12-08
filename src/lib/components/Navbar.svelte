<script>
  export let image
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost text-xl">Home</a>
    <a href="/signup" class="btn btn-ghost text-xl">Signup</a>
    <a href="/posts" class="btn btn-ghost text-xl">Posts</a>
  </div>

  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full">
        <img alt="user" src={image} />
      </div>
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->

    <ul
      tabindex="0"
      class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li>
        <a href="/bio" class="justify-between"> Bio </a>
      </li>
      <li><a href="/">Logout</a></li>
    </ul>
  </div>
</div>

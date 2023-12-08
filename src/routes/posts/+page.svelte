<script>
  export let data
</script>

<h1>Posts</h1>

<form method="POST" action="?/createPost">
  <input
    class="input w-full max-w-xs"
    id="title"
    type="text"
    name="title"
    placeholder="Title"
  />
  <input
    class="input w-full max-w-xs"
    id="content"
    type="text"
    name="content"
    placeholder="Content"
  />
  <button class="btn" type="submit">send</button>
</form>

<br />
<div class="flex flex-col gap-2">
  {#each data.posts as post}
    <div class="card w-96 bg-primary text-primary-content">
      <div class="card-body">
        <h2 class="card-title">{post.title}</h2>
        <p>{post.content}</p>
        <div class="card-actions justify-end">
          <a href="/posts/{post.id}"><button class="btn">Comment</button></a>
        </div>
      </div>
    </div>
  {/each}
</div>

<script>
  export let data
  const post = data.comments
  const parents = post.comments
</script>

<div class="card w-96 bg-neutral text-neutral-content">
  <div class="card-body items-center text-center">
    <h2 class="card-title">{post.title}</h2>
    <p>{post.content}</p>
    <div class="card-actions justify-end">
      <form method="POST" action="?/commentPost">
        <input type="hidden" name="postId" value={post.id} />
        <input
          type="text"
          name="postComment"
          placeholder="Leave a comment"
          class="input input-bordered input-primary w-full max-w-xs"
        />
        <button type="submit" class="btn btn-primary">comment</button>
        <button class="btn btn-ghost">Like</button>
      </form>
    </div>
  </div>
</div>

{#each parents as parent}
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">{parent.message}</h2>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>
{/each}

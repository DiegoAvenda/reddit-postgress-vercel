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
          name="message"
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
  <div class="static mt-10 m-2">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{parent.message}</h2>
        <div class="card-actions justify-end">
          <form method="POST" action="?/commentComment">
            <input type="hidden" name="postId" value={post.id} />
            <input type="hidden" name="parentId" value={parent.id} />
            <input
              type="text"
              name="message"
              placeholder="Leave a comment"
              class="input input-bordered input-primary w-full max-w-xs"
            />
            <button class="btn btn-ghost">Like</button>
            <button type="submit" class="btn btn-primary">comment</button>
          </form>
        </div>
      </div>
    </div>

    {#if parent.children}
      {#each parent.children as son}
        <div class="relative mt-10 mb-4 left-10 top-4">
          <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">{son.message}</h2>
              <div class="card-actions justify-end">
                <form method="POST" action="?/commentComment">
                  <input type="hidden" name="postId" value={post.id} />
                  <input type="hidden" name="parentId" value={son.id} />
                  <input
                    type="text"
                    name="message"
                    placeholder="Leave a comment"
                    class="input input-bordered input-primary w-full max-w-xs"
                  />
                  <button class="btn btn-ghost">Like</button>
                  <button type="submit" class="btn btn-primary">comment</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {#if son.children}
          {#each son.children as nieto}
            <div class="relative mt-10 mb-4 left-10 top-4">
              <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body">
                  <h2 class="card-title">{nieto.message}</h2>
                  <div class="card-actions justify-end">
                    <button class="btn btn-ghost">Like</button>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        {/if}
      {/each}
    {/if}
  </div>
{/each}

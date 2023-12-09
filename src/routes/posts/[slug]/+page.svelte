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
      </form>
    </div>
  </div>
</div>

<div class="flex flex-col gap-2 relative mt-3">
  {#each parents as parent}
    <div class="left-4 card w-96 bg-primary shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{parent.message}</h2>
        <div class="card-actions justify-end">
          <form method="POST" action="?/commentComment">
            <input type="hidden" name="postId" value={post.id} />
            <input type="hidden" name="parentId" value={parent.id} />
            <input type="hidden" name="userId" value={parent.userId} />
            <input
              type="text"
              name="message"
              placeholder="Leave a comment"
              class="input input-bordered input-primary w-full max-w-xs"
            />
            <button type="submit" class="btn btn-primary">comment</button>
            <input
              type="text"
              name="editedText"
              placeholder="Edit comment"
              class="input input-bordered input-primary w-full max-w-xs"
            />
            <input type="hidden" name="userEmail" value={parent.user.email} />
            <button class="btn btn-primary" formaction="?/editComment"
              >Edit</button
            >
            <button formaction="?/like" class="btn btn-ghost">Like</button>
            <button formaction="?/dislike" class="btn btn-ghost">Dislike</button
            >
          </form>
          <p>Likes: {parent.likes.length}</p>
        </div>
      </div>
    </div>

    {#if parent.children}
      {#each parent.children as son}
        <div class="left-8 card w-96 bg-primary shadow-xl">
          <div class="card-body">
            <h2 class="card-title">{son.message}</h2>
            <div class="card-actions justify-end">
              <form method="POST" action="?/commentComment">
                <input type="hidden" name="postId" value={post.id} />
                <input type="hidden" name="parentId" value={son.id} />
                <input type="hidden" name="userId" value={son.userId} />
                <input
                  type="text"
                  name="message"
                  placeholder="Leave a comment"
                  class="input input-bordered input-primary w-full max-w-xs"
                />
                <button formaction="?/like" class="btn btn-ghost">Like</button>
                <button formaction="?/dislike" class="btn btn-ghost"
                  >Dislike</button
                >
                <button type="submit" class="btn btn-primary">comment</button>
              </form>
              <p>Likes: {son.likes.length}</p>
            </div>
          </div>
        </div>

        {#if son.children}
          {#each son.children as nieto}
            <div class="left-12 card w-96 bg-primary shadow-xl">
              <div class="card-body">
                <h2 class="card-title">{nieto.message}</h2>
                <div class="card-actions justify-end">
                  <form method="POST" action="?/commentComment">
                    <input type="hidden" name="postId" value={post.id} />
                    <input type="hidden" name="parentId" value={nieto.id} />
                    <input type="hidden" name="userId" value={nieto.userId} />
                    <button formaction="?/like" class="btn btn-ghost"
                      >Like</button
                    >
                    <button formaction="?/dislike" class="btn btn-ghost"
                      >Dislike</button
                    >
                  </form>
                  <p>Likes: {nieto.likes.length}</p>
                </div>
              </div>
            </div>
          {/each}
        {/if}
      {/each}
    {/if}
  {/each}
</div>

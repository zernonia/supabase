import PostPreview from './post-preview'
import Post from '../types/post'

type Props = {
  posts: Post[]
}

const Posts = ({ posts }: Props) => {
  return (
    <section>
      <div className="grid grid-cols-1 mb-12 md:grid-cols-2 xl:grid-cols-3 md:gap-4">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}

export default Posts

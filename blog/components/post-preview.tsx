import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import Author from '../types/author'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
}

const PostPreview = ({ title, coverImage, date, excerpt, author, slug }: Props) => {
  const smallCss = `border-black block border-t-2 p-4 py-8 -mx-4 hover:border-green-500 last:border-b`
  const mediumAndAboveCss = `md:mx-0 md:p-4 md:border-2 md:hover:shadow-lg md:rounded-md`
  const transitionCss = `transition duration-300 ease-in-out`
  return (
    <Link as={`/${slug}`} href="/[slug]">
      <a className={`PostPreview ${smallCss} ${mediumAndAboveCss} ${transitionCss}`}>
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <h3 className=" text-3xl mb-3 leading-snug font-semibold">{title}</h3>
          </div>
          <div className="flex">
            <div className="flex-grow">
              <DateFormatter dateString={date} />
            </div>
            <div className="PreviewArrow h-8 w-8 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PostPreview

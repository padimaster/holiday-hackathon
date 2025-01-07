import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { IPopulatedPost } from '@/backend/posts';
import PostActions from './post-actions';
import PostImage from './post-image';

interface PostItemProps {
  post: IPopulatedPost;
}

export default function PostItem({ post }: PostItemProps) {
  const timestamp = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  const { profile } = post;

  return (
    <article className='group transition-colors hover:bg-gray-900/50'>
      <div className='px-4 py-3'>
        <div className='flex gap-3'>
          {/* Profile Section */}
          <Avatar className='h-10 w-10 flex-shrink-0'>
            <AvatarImage
              src={profile.avatar}
              alt={`${profile.name}'s avatar`}
            />
            <AvatarFallback aria-label={`${profile.name}'s avatar fallback`}>
              {profile.name[0]}
            </AvatarFallback>
          </Avatar>

          <div className='min-w-0 flex-1'>
            {/* Header Section */}
            <div className='flex items-center gap-2 text-sm'>
              <span className='truncate font-medium text-gray-100'>
                {profile.name}
              </span>
              <span className='text-gray-500'>@{profile.handle}</span>
              <span className='select-none text-gray-500' aria-hidden='true'>
                ·
              </span>
              <time
                dateTime={post.createdAt}
                className='text-gray-500'
                title={new Date(post.createdAt).toLocaleString()}
              >
                {timestamp}
              </time>
            </div>

            {/* Content Section */}
            <div className='mt-2 break-words text-gray-100'>{post.content}</div>

            {/* Image Section */}
            {post.imageUrl && <PostImage imageUrl={post.imageUrl} />}

            {/* Actions Section */}
            <div className='mt-3'>
              <PostActions post={post} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

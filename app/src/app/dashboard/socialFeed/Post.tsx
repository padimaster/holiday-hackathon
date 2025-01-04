import * as React from "react";
import { PostData } from "./types";

interface PostProps {
  post: PostData;
}

export function Post({ post }: PostProps) {
  return (
    <div className="flex overflow-hidden flex-wrap gap-2.5 items-start px-5 py-2 text-base font-bold max-md:px-5 max-md:max-w-full">
      <img
        loading="lazy"
        src={post.user.avatar}
        alt={`${post.user.name}'s avatar`}
        className="object-contain shrink-0 w-10 aspect-square"
      />
      <div className="flex flex-col min-w-[240px] w-[507px] max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between w-full text-gray-500 whitespace-nowrap">
          <div className="flex gap-1.5 items-center my-auto">
            <div className="self-stretch my-auto text-white">
              {post.user.name}
            </div>
            {post.user.verified && (
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9dc3a8dd0858a36e9438ffbab30690ba9c47e2db0d313d3edacdac0453d7994?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
                alt="Verified"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
            )}
            <div className="self-stretch my-auto">{post.user.handle}</div>
            <div className="self-stretch my-auto">·</div>
            <div className="self-stretch my-auto">{post.timestamp}</div>
          </div>
          <button
            aria-label="More options"
            className="object-contain z-10 shrink-0 rounded-3xl aspect-square w-[27px]"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/feb005b3e99569fdea5a2df839011f8e5a909a2239ab504a2938d76dc50e340f?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
              alt=""
            />
          </button>
        </div>
        <div className="mt-1.5 text-white">{post.content}</div>
        {post.linkPreview && (
          <div className="flex overflow-hidden items-center mt-1.5 w-full text-gray-500 bg-black rounded-xl border border-gray-500 border-solid">
            <div className="flex overflow-hidden flex-col self-stretch pb-5 my-auto bg-black min-w-[240px] w-[507px]">
              {post.linkPreview.image && (
                <img
                  loading="lazy"
                  src={post.linkPreview.image}
                  alt=""
                  className="object-contain w-full aspect-[2.36]"
                />
              )}
              <div className="flex flex-col items-start mt-2.5 ml-2.5 max-w-full w-[343px]">
                <div className="w-full font-bold text-white">
                  {post.linkPreview.title}
                </div>
                <div className="self-stretch">
                  {post.linkPreview.description}
                </div>
                <div className="flex gap-1 whitespace-nowrap">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/02b4c15bed32bd1af929eccc1f5a2481bbef802b02a615a5dd368b319b483719?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
                    alt=""
                    className="object-contain shrink-0 w-4 aspect-square"
                  />
                  <div>{post.linkPreview.url}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-10 items-start self-start mt-1.5 whitespace-nowrap">
          <button aria-label="Comment" className="flex items-center gap-2">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2018c6b6bd9baf782c6213ea414abdf0a4ce8c0effc2c65eafa9ab325b6e0cb?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
              alt=""
              className="object-contain shrink-0 aspect-[2.6] w-[52px]"
            />
            <span>{post.stats.comments}</span>
          </button>
          <button aria-label="Repost" className="flex items-center gap-2">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb43db7adaac5d22ef6a89629bfc25919dbcdc6a078bca95b1b595f30dd33c02?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
              alt=""
              className="object-contain shrink-0 aspect-square w-[19px]"
            />
            <span>{post.stats.shares}</span>
          </button>
          <button aria-label="Like" className="flex items-center gap-2">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/96827c64d000b92e3fa3e3938582142507d7da248f55d39e86a23ecde79ade78?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
              alt=""
              className="object-contain shrink-0 aspect-[0.65] w-[11px]"
            />
            <span>{post.stats.likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

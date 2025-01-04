import * as React from "react";
import { SocialPostProps } from "../types";

export const SocialPost: React.FC<SocialPostProps> = ({
  avatar,
  username,
  handle,
  timestamp,
  content,
  isVerified,
  metrics,
  media,
}) => {
  return (
    <div className="flex overflow-hidden flex-wrap gap-2.5 items-start px-5 py-2 text-base font-bold max-md:px-5 max-md:max-w-full">
      <img
        loading="lazy"
        src={avatar}
        alt={`${username}'s avatar`}
        className="object-contain shrink-0 w-10 aspect-square"
      />
      <div className="flex flex-col min-w-[240px] w-[507px] max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between w-full text-gray-500 whitespace-nowrap">
          <div className="flex gap-1.5 items-center my-auto">
            <div className="self-stretch my-auto text-white">{username}</div>
            {isVerified && (
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9dc3a8dd0858a36e9438ffbab30690ba9c47e2db0d313d3edacdac0453d7994?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
                alt="Verified badge"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
            )}
            <div className="self-stretch my-auto">{handle}</div>
            <div className="self-stretch my-auto">·</div>
            <div className="self-stretch my-auto">{timestamp}</div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bf81b775e516429ab7170391c0eac3e669e366e30685ebf4a91b7be594f3595b?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
            alt=""
            className="object-contain z-10 shrink-0 rounded-3xl aspect-square w-[27px]"
          />
        </div>
        <div className="flex flex-col items-center mt-1.5 w-full">
          <div className="w-full text-white">{content}</div>
          {media && (
            <div className="flex overflow-hidden items-center mt-1.5 w-full text-gray-500 bg-black rounded-xl border border-gray-500 border-solid">
              <div className="flex overflow-hidden flex-col self-stretch pb-5 my-auto bg-black min-w-[240px] w-[507px]">
                {media.image && (
                  <img
                    loading="lazy"
                    src={media.image}
                    alt=""
                    className="object-contain w-full aspect-[2.36]"
                  />
                )}
                {(media.title || media.description || media.url) && (
                  <div className="flex flex-col items-start mt-2.5 ml-2.5 max-w-full w-[343px]">
                    {media.title && (
                      <div className="w-full font-bold text-white">
                        {media.title}
                      </div>
                    )}
                    {media.description && (
                      <div className="self-stretch">{media.description}</div>
                    )}
                    {media.url && (
                      <div className="flex gap-1 whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/02b4c15bed32bd1af929eccc1f5a2481bbef802b02a615a5dd368b319b483719?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
                          alt=""
                          className="object-contain shrink-0 w-4 aspect-square"
                        />
                        <div>{media.url}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-10 items-start self-start mt-1.5 whitespace-nowrap">
          <div className="flex gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2018c6b6bd9baf782c6213ea414abdf0a4ce8c0effc2c65eafa9ab325b6e0cb?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
              alt=""
              className="w-5 h-5"
            />
            <span>{metrics.replies}</span>
          </div>
          <div className="flex gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c4ff274273d2d8772f1d84773707bdd9ef284db7f0ba25e489b0f3115447f67?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
              alt=""
              className="w-5 h-5"
            />
            <span>{metrics.reposts}</span>
          </div>
          <div className="flex gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/96827c64d000b92e3fa3e3938582142507d7da248f55d39e86a23ecde79ade78?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
              alt=""
              className="w-5 h-5"
            />
            <span>{metrics.likes}</span>
          </div>
          <div className="flex gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcbca3ebae0951681505b2da3fc454932e019d63c2301452bd90d3615d29c388?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
              alt=""
              className="w-5 h-5"
            />
            <span>{metrics.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

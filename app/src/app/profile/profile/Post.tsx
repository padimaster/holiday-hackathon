import * as React from "react";
import { PostProps } from "./types";

export const Post: React.FC<PostProps> = ({
  author,
  handle,
  timestamp,
  content,
  image,
}) => {
  return (
    <div className="flex overflow-hidden flex-col max-w-full bg-black w-[549px]">
      <div className="flex overflow-hidden gap-2.5 items-start px-5 py-2 w-full">
        <div className="flex flex-col min-w-[240px] w-[507px] max-md:max-w-full">
          <div className="flex flex-wrap gap-5 justify-between w-full text-base font-bold text-gray-500 whitespace-nowrap">
            <div className="flex gap-1.5 items-center my-auto">
              <div className="self-stretch my-auto text-white">{author}</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6405069d28855c11ce80023bd28c50279f0b062255b33192ceee11b51cfb64f3?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                alt="Verified badge"
              />
              <div className="self-stretch my-auto">{handle}</div>
              <div className="self-stretch my-auto">·</div>
              <div className="self-stretch my-auto">{timestamp}</div>
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d395a48a8cdb1b7a141c123a50e35e05ecf8ab6b13ce403985731f1d4d209e92?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
              className="object-contain z-10 shrink-0 rounded-3xl aspect-square w-[27px]"
              alt="More options"
            />
          </div>
          <div className="flex flex-col items-center mt-1.5 w-full">
            <div className="w-full text-base text-white">{content}</div>
            {image && (
              <div className="flex overflow-hidden items-center mt-1.5 w-full bg-black rounded-xl border border-gray-500 border-solid">
                <img
                  loading="lazy"
                  src={image}
                  className="object-contain self-stretch my-auto aspect-[2.11] min-w-[240px] w-[507px]"
                  alt="Post attachment"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import * as React from "react";

export function SearchBar() {
  return (
    <div className="flex flex-col items-center w-full text-base text-gray-500 min-h-[108px]">
      <div className="flex overflow-hidden gap-2.5 px-2.5 py-2 max-w-full bg-zinc-900 rounded-[40px] w-[350px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3dd76f08123b59866fb19fdf50d15224664979034de230cd608179c3a554d7d5?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
          alt=""
          className="object-contain shrink-0 w-6 aspect-square"
        />
        <input
          type="search"
          placeholder="Search"
          aria-label="Search"
          className="flex-auto my-auto w-[291px] bg-transparent border-none focus:outline-none"
        />
      </div>
    </div>
  );
}

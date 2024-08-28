// LoadChatBubble.tsx
import Image from "next/image";

const LoadChatBubble = () => {
  return (
      <div className="flex gap-3 mr-auto w-[100%] py-2">
        <div className="flex flex-col gap-2 order-2 items-start w-full">
            <div className="w-full">
                    <div className="h-4 animate-pulse bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 animate-pulse bg-gray-300 rounded w-2/4"></div>
            </div>
        </div>
        <figure className="w-6 h-6 rounded-full">
            <Image 
            width={20}
            height={20}
            alt="Tutor"
            src="/assets/images/kam-icon.svg"
            className="w-full h-full"
            />
        </figure>
    </div>
  );
};

export default LoadChatBubble;
        
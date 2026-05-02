export const FeedbackSection = () => {
  // Feedback options data
  const feedbackOptions = [
    {
      src: "/36c405bb-7527-44fd-b70c-89e33a59ab5b-removalai-preview-1.png",
      alt: "Element",
      label: "This Helped !",
      multiLine: false,
    },
    {
      src: "/146cb83d-2201-4d9c-a155-b94e7498536d-removalai-preview-1.png",
      alt: "Element",
      label: "Food for\nThought..",
      multiLine: true,
    },
    {
      src: "/dfeb4303-9f84-42ad-a431-9d702b75971b-removalai-preview-1.png",
      alt: "Dfeb f ad",
      label: "I still have\ndoubts !",
      multiLine: true,
    },
    {
      src: "/6f6acb0c-8bc2-4272-929b-61f57cad54be-removalai-preview-1.png",
      alt: "Element",
      label: "Can be\nBetter",
      multiLine: true,
    },
    {
      src: "/6c21da76-2740-4d77-aa78-0e1741243fab-removalai-preview-1.png",
      alt: "Element",
      label: "Spotted\nsomething !!",
      multiLine: true,
    },
    {
      src: "/39aff0c0-b383-4d38-90fc-83dad64c0167-removalai-preview-1.png",
      alt: "Element",
      label: "Update\nneeded..",
      multiLine: true,
    },
  ];

  return (
    
    <section
      className="relative w-full rounded-[20px] sm:rounded-[35px] overflow-hidden bg-[linear-gradient(180deg,rgba(10,10,16,1)_0%,rgba(23,33,55,0)_100%)] h-[350px] sm:h-[450px] md:h-[597px]"
      style={{
        border: "none",
      }}
    >
      {/* Golden gradient border via pseudo-element simulation using a wrapper */}
      <div
        className="absolute inset-0 rounded-[20px] sm:rounded-[35px] pointer-events-none z-[1]"
        style={{
          padding: "1px",
          background:
            "linear-gradient(180deg,rgba(255,176,0,1) 0%,rgba(255,176,0,0) 81%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Title */}
      <div className="absolute top-6 sm:top-[40px] md:top-[52px] left-0 right-0 flex items-center justify-center h-8 sm:h-11">
        <span
          className="[font-family:'Montserrat',Helvetica] font-bold text-lg sm:text-2xl md:text-4xl text-center tracking-[1.26px] leading-tight sm:leading-[43.1px] whitespace-nowrap"
          style={{
            background:
              "linear-gradient(315deg,rgba(255,229,161,1) 0%,rgba(191,132,26,1) 51%,rgba(255,205,116,1) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          TELL US WHAT YOU THINK?
        </span>
      </div>

      {/* Feedback options row */}
      <div className="absolute top-16 sm:top-[90px] md:top-[126px] left-0 right-0 flex flex-wrap flex-row items-end justify-around px-2 sm:px-6 gap-y-4">
        {feedbackOptions.map((option, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer w-1/3 sm:w-auto"
          >
            <img
              className="object-cover w-[70px] h-[90px] sm:w-[110px] sm:h-[150px] md:w-[150px] md:h-[200px]"
              alt={option.alt}
              src={option.src}
            />
            <div className="[font-family:'Montserrat',Helvetica] font-normal text-white text-xs sm:text-base md:text-xl text-center tracking-[0] leading-[18px] sm:leading-[24px] md:leading-[30px] mt-1 sm:mt-2">
              {option.multiLine
                ? option.label.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < option.label.split("\n").length - 1 && <br />}
                    </span>
                  ))
                : option.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
import HighlightText from "./HighlightText";

const HeadingContent = ({heading,body,highlighttext,styleHeadingContent}) => {
  return ( 
    <div className={`flex ${styleHeadingContent} lg:gap-2`}>
      <h1 className={`text-semibold text-3xl w-full text-start lg:text-4xl leading-[44px] tracking-[-0.02em] ${heading.style}`}>
        {heading.content[0]}  
        <HighlightText 
          text={highlighttext} 
          color="bg-gradient-to-r text-transparent bg-clip-text from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"
        />
        {
          heading.content[1] && 
          heading.content[1]
        }
      </h1>
      <p className={`font-medium sm:text-start text-base leading-6 ${body.style}`}>{body.content}</p>
    </div>
  )
}

export default HeadingContent;
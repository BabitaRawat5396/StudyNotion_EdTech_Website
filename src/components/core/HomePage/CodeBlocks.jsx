import CommonButton from '../../common/CommonButton';
import { TypeAnimation } from 'react-type-animation';
import HeadingContent from '../../common/HeadingContent';


const CodeBlocks = ({
    styleCodeBlocks,
    heading,
    subsection,
    button1,
    button2,
    codeblocks,
    codeColor,
    backColor,
    bottom,
    right,
    highlighttext,
    styleHeadingContent
}) => {
  return (
    <div className={`flex flex-col ${styleCodeBlocks} gap-10`}>
        {/* Section 1 */}
        <div className=' flex flex-col justify-center'>
            <HeadingContent
                styleHeadingContent={styleHeadingContent}
                heading={
                    {
                        style:heading.style,
                        content:heading.content
                    }
                }
                body={
                    {
                        style:subsection.style,
                        content:subsection.content
                    }
                }
                highlighttext={highlighttext}
            />
            <div className='flex gap-5 sm:gap-10 mt-10 border'>
                <CommonButton 
                    icon={button1.icon} 
                    linkto={button1.linkto}
                    customStyle={button1.style}
                >
                    {button1.content}
                </CommonButton>
                <CommonButton 
                    linkto={button2.linkto}
                    customStyle={button2.style}
                >
                    {button2.content}
                </CommonButton>
            </div>
            
        </div>

        {/* Section 2 */}
        <div className='relative flex h-fit lg:w-4/5 text-richblack-400 bg-gradient-to-r from-[#0d20403d] to-[#06142d61] z-3'>
            <div className={`absolute left-2 top-5 h-[40%] w-[50%] md:h-[40%] md:w-[50%] lg:h-[50%] lg:w-[40%] ${backColor} blur-3xl rounded-full z-0`} style={{bottom:bottom,right:right}}></div>
            <div className='w-[10%] flex flex-col justify-center items-center text-sm'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
                <p>13</p>
                <p>14</p>

            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation
                    sequence={[codeblocks,2000,""]}
                    cursor={true}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                    style={
                        {
                            fontSize:"0.8rem",
                            whiteSpace:"pre-line",
                            display:"block"                            

                        }
                    }
                />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks
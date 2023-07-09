import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/md';


const CommonButton = ({children,linkto,customStyle,icon}) => {
    const Icon = Icons[icon];
    
    return (
        <Link to={linkto}>
            <button className={` whitespace-nowrap font-bold text-sm sm:text-base flex items-center gap-2 py-[0.6rem] tracking-wide lg:h-12 rounded-lg 
                text-center lg:p-4 px-[1.1rem] transition-all duration-200 hover:scale-95 shadow-inset-white 
                 ${customStyle}`}
            >
                <p>{children}</p>
                {
                    Icon &&
                    <Icon/>
                }
                
            </button>
        </Link>
    )
}

export default CommonButton;
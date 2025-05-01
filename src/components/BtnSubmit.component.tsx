import Link from "next/link";

interface values {
    
    name?: string
    isSubmitting: boolean
    colorHover? : string
    padding?: string
    more?: string
}

export default function BtnSubmit(props: values) {
    return (
        <button 
                type="submit"
                disabled={props.isSubmitting}
                className={`flex ${props.more} items-center gap-2 bg-green-600 border text-white px-2 py-1 rounded 
                ${props.isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:border'}`}
            >
                {props.isSubmitting ? (
                    <>
                        <svg 
                            className="animate-spin h-5 w-5 text-white" 
                            viewBox="0 0 24 24"
                        >
                            <circle 
                                className="opacity-25" 
                                cx="12" cy="12" r="10" 
                                stroke="currentColor" 
                                strokeWidth="4"
                            ></circle>
                            <path 
                                className="opacity-75" 
                                fill="currentColor" 
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                        Processing...
                    </>
                ) : (
                    'SUBMIT'
                )}
            </button>
    );
}
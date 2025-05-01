interface Types {
    msg?: string
}

export default function Load(props: Types) {
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="  text-center shadow-md w-full max-w-md ">
                <h1>{props.msg || 'LOADING.....'}</h1>
            </div>
        </div>
    );
}
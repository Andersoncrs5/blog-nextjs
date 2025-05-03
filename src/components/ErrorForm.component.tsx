interface Types {
    data: string[]
}

export default function ErrorForm(props: Types) {
    return (
        <div 
           style={{
            position: 'absolute',
            top: '2%',
            left: '50%',
            transform: 'translateX(-50%)',
          }} 
          className={"bg-red-400 p-1.5 border rounded w-[98%] "} >
            {
                props.data.map((e, i) => {
                    return (
                        <small className={"block"} key={i} >{e}</small>
                    );
                })
            }
        </div>
    );
}
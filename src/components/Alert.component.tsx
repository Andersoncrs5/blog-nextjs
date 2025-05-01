interface Types {
  name: string;
  color?: string
}

export default function Alert(props: Types) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '2%',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      className={`w-[96%] p-3 text-center mx-auto z-50 bg-${props.color || 'green'}-600 border rounded-xl`}
    >
      <h2>{props.name}</h2>
    </div>
  );
}
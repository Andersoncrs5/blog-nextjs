import Btn from "@/components/Btn.component";
import Header from "@/components/Header.component";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [logged, setLogged] = useState<boolean>(false);
  

  return (
    <div>
      <Header title="Blog"  />



    </div>
  );
}

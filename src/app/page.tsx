'use client'

import "../app/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import Image from "next/image";

export default function SplashScreen() {
  const router = useRouter();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      router.push("/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  if (!visible) return null;

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-white text-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <Image src="/Planet.png" alt="Logo" width={300} height={300} />
        <div className="animate-spin mt-10">
          <Loader className="w-6 h-6 text-black" />
        </div>
        <Image src="/space-escrita.svg" alt="Logo" width={128} height={128} className="w-32 h-32" />
        {/* <h1 className="text-xl font-semibold">Space</h1> */}
      </motion.div>
    </div>
  );
}

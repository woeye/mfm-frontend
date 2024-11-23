import { Rubik_Dirt, Nunito } from "next/font/google";

const rubik = Rubik_Dirt({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik"
});

const nunito400 = Nunito({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-400"
});

const nunito800 = Nunito({
  weight: "800",
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-800"
});

export {
  rubik,
  nunito400,
  nunito800
};

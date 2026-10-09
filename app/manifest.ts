import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name:"Sarchashma Brothers", short_name:"Sarchashma", description:"Premium Afghan apples for wholesale buyers", start_url:"/", display:"standalone", background_color:"#fffaf1", theme_color:"#0b3325", icons:[{src:"/brand/logo.png",sizes:"1254x1254",type:"image/png"}] }; }

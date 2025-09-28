import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Link from "@editorjs/link"

import { uploadImg } from "../common/aws";

const uploadImgByUrl = async (url) => {
  return {
    success: 1,
    file: { url }
  };
};


const uploadImgByFile = (e) => {
    return uploadImg(e).then(url => {
        if (url) {
            return {
                success: 1,
                file: { url }
            }
        }
    })

}


export const tools = {
        embed: Embed,
        image: {
            class: Image,
            config: {
                uploader: {
                    uploadByUrl: uploadImgByUrl,
                    uploadByFile: uploadImgByFile,
                },
                pasteConfig: {
                    patterns: [/https?:\/\/.*\.(jpg|jpeg|png|gif)$/i]
                }

            }
        },
        header: {
            class: Header,
            inlineToolbar:true,
            config: {
                placeholder: "Type Heading...",
                levels: [2, 3],
                defaultLevel: 2
            }
        },
        list: {
            class: List,
            inlineToolbar:true
        },
        quote:{
            class: Quote,
            inlineToolbar:true
        },
        marker: Marker,
        inlinecode: InlineCode,
        link: Link
}
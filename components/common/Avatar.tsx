import Image from "next/image";

type AvatarProps = {
    src? : string | null;
    alt: string;
    size? : number
}

export default function Avatar({src, alt, size=50} : AvatarProps) {

    if(!src){
        return(
            <Image 
            src="/user-avatar.png"
            alt="John Doe"
            width={size}
            height={size}
            className="rounded-full"
            />
        )
    }

    return(
        <Image 
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full"
        />
    )
}
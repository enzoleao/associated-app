import Link from "next/link";

interface FooterLinksProps {
    name: string;
    href: string
}

export function FooterLinks({name, href}: FooterLinksProps){
    return (
        <Link className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer" href={href}>
            {name}
        </Link>
    )
}
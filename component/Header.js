import Head from 'next/head';
import { decode } from 'js-base64';

function Header({ title, description, image, link, type }) {
    return (
        <Head>
            {/* METAS */}
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <meta name="description" content={description}></meta>
            <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>"></link>

            {/* FACEBOOK */}
            <meta property="og:url" content={link} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={decode(image)} />
            <meta property="og:type" content={type} />
            <meta property="og:locale" content="es_ES" />
            <meta property="og:site_name" content="xaconi.dev" />
        </Head>
    );
}
export default Header;
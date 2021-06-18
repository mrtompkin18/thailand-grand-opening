import Head from 'next/head';

function Header({ title, description, image, link, type }) {
    return (
        <Head>
            <title>{title}</title>
            <meta charset="UTF-8" />
            <meta name="description" content={description} />
            <meta property="og:url" content={link} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:type" content={type} />
        </Head>
    );
}

export default Header;
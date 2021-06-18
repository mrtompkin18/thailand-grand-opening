import Head from 'next/head';

function Header({ title, description, image, link, type }) {
    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>"></link>
            <meta name="description" content={description}></meta>
            <meta property="og:url" content={link} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:type" content={type} />
        </Head>
    );
}

export default Header;
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import styles from "./layout.module.css"
import utilStyles from "../styles/utils.module.css"

const name = "It's me!"
export const siteTitle = "It's My Site and I want it Now"

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Running through the tutorial of Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle,
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
            </Head>

            <header className={styles.header}>
                {home ? (
                    <>
                        <Image
                            priority
                            src="/images/profile.jpg"
                            height={200}
                            width={200}
                            className={utilStyles.borderCircle}
                        />
                        <h1 className={utilStyles.heading2x1}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <Image
                                priority
                                src="/images/profile.jpg"
                                height={200}
                                width={200}
                                className={utilStyles.borderCircle}
                            />
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/" className={utilStyles.colourInherit}>
                                {name}
                            </Link>
                        </h2>
                    </>
                )}
            </header>

            <main>
                {children}
            </main>

            {
                !home && (
                    <div className="">
                        <Link href="/" className={utilStyles.backToHome}>Back to Home</Link>
                    </div>
                )
            }
        </div>
    )
}
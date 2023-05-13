import Head from 'next/head';
import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css'
import Link from "next/link"
import Date from "../components/date"
import Layout, {siteTitle} from "../components/layout"
import { getSortedPostsData } from '../lib/posts';

// this gets passed to Home() as a prop
export async function getStaticProps() {
  const postsData = getSortedPostsData()
  return {
    props: {
      postsData
    }
  }
}

export default function Home({postsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello!</p>
        <p>Running through a basic Next.js tutorial for a blog. I will publish this one!</p>
      </section>

      <section>
        <h2 className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>Blog</h2>
        <ul className={utilStyles.list}>
          {postsData.map(post => {
            return (
              <li className={utilStyles.listItem} key={post.id}>
                <Link href={`posts/${post.id}`}>{post.title}</Link>
                <br />
                <small>
                  <Date dateString={post.date} />
                </small>
              </li>
            )
          })}
        </ul>
      </section>
    </Layout>
  )
}

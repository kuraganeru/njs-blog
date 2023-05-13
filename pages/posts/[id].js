import Layout from "../../components/layout";
import Date from '../../components/date'
import Head from 'next/head';
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css"

export async function getStaticProps({ params }) { //params = posts/*id here* in URL
    const postData = await getPostData(params.id) // find the post data in our local system using the param.id
    return {
        props: {
            postData
        }
    }
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>

            <article>
                <h1 className="heading2x1">{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.formattedContentHTML }} />
            </article>
        </Layout>
    )
}
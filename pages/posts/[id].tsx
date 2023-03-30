import Head from 'next/head';
import {getAllPostIds, getPostData} from '../../lib/posts';
import Layout from '../../components/layout';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths } from 'next'

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params?.id as string);

    return {
        props: {
            postData,
        },
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllPostIds();

    return {
        paths,
        fallback: false,
    };
}

const Post = ({ postData }: {
    postData: {
        title: string
        date: string
        text: string
    }
}) => {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div>{postData.text}</div>
            </article>
        </Layout>
    );
}

export default Post;
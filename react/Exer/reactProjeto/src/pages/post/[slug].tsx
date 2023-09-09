import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

// Components
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { RichText } from 'prismic-dom';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from '../../components/Header';

// Service
import { getPrismicClient } from '../../services/prismic';

// Styles
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    subtitle: string;
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  const tempRead = post.data.content.reduce((acc, content) => {
    const textBody = RichText.asText(content.body)
      .split(/<.+?>(.+?)<\/.+?>/g)
      .filter(t => t);

    const ar = [];
    textBody.forEach(fr => {
      fr.split(' ').forEach(pl => {
        ar.push(pl);
      });
    });

    const min = Math.ceil(ar.length / 200);
    return acc + min;
  }, 0);

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.data.title} | ig.news</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <article className={styles.post}>
          <img src={post.data.banner.url} alt={post.data.title} />
          <div className={styles.postContent}>
            <h1>{post.data.title}</h1>
            <div className={styles.timeContainer}>
              <div>
                <FiCalendar />
                <time>
                  {format(
                    new Date(post.first_publication_date),
                    'dd MMM yyyy',
                    {
                      locale: ptBR,
                    }
                  )}
                </time>
              </div>
              <div>
                <FiUser /> {post.data.author}
              </div>
              <div>
                <FiClock /> {tempRead} min
              </div>
            </div>

            {post.data.content.map(contentBody => (
              <div key={contentBody.heading}>
                <strong>{contentBody.heading}</strong>
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(contentBody.body),
                  }}
                />
              </div>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      fetch: ['post.uid'],
      pageSize: 100,
    }
  );

  const postsPaths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths: postsPaths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content,
    },
  };

  return {
    props: {
      post,
    },
  };
};

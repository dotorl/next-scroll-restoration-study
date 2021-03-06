import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { axiosGetCache } from '../util/axiosCache';
import Movie from './components/Movie';
import useScrollMove from './hooks/useScrollMove';

const Home: NextPage = () => {
  const [sampleData, setSampleData] = useState([]);
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenera, setActiveGenera] = useState(0);

  const default_API_URL =
    'https://api.themoviedb.org/3/movie/popular?api_key=d1eb186c558e65b045af69086018917f&language=en-US&page=1';
  const default_API_URL2 = 'https://base.uplus.co.kr:9001/ubaseweb/mobile/homepanel?panelId=P2773';

  // 새로운 scroll 만들어 보기.
  // const { scrollInfos, scrollSave, scrollRemove } = useScrollMove({
  //   page: `home`,
  //   path: `/`,
  //   dom: '',
  // });

  // useEffect(() => {
  //   console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@ HERE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  //   // console.log(scrollInfos);
  //   if (scrollInfos) {
  //     console.log('scrollInfos : ', scrollInfos);
  //     setTimeout(() => {
  //       const transScrollInfos = Number(scrollInfos);
  //       window.scrollTo(0, transScrollInfos);
  //       const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  //       console.log('scrollTop : ', scrollTop);
  //       console.log('scrollInfos : ', scrollInfos);
  //       //현재위치와 복구위치가 같다면
  //       if (scrollTop.toString() === scrollInfos) {
  //         scrollRemove();
  //       }
  //     }, 0);
  //   }
  // }, [scrollInfos, scrollRemove]);

  useEffect(() => {
    // fetchPopular();
    defaultAxios();
    // history.scrollRestoration = 'auto';

    // return () => {
    //   // 페이지 나갈 때 스크롤 위치 기억하는걸로 해보기
    //   console.log('unmount unmount unmount unmount');
    //   scrollSave();
    // };
  }, []);

  // CASE1. 기본 Fetch 사용할 경우
  const fetchPopular = async () => {
    const data = await fetch(default_API_URL);
    const movies = await data.json();
    setPopular(movies.results);
    setFiltered(movies.results);
  };

  // CASE2. Axios 사용할 경우
  const defaultAxios = async () => {
    // ! 단순 cache 없이 axios
    // const movies = await axios.get(default_API_URL);
    // setPopular(movies.data.results);
    // setFiltered(movies.data.results);
    // ! Cache 사용하여 axios
    const movis = await axiosGetCache(default_API_URL, {}, { forceUpdate: false, cache: true }).then((res) => {
      console.log('###########');
      setPopular(res.data.results);
      setFiltered(res.data.results);

      // setTimeout(() => {
      //   window.scrollTo(0, 400);
      // }, 0);
    });

    // panel TEST
    // const response = await axios.get('');
    // const response = await axiosGetCache(default_API_URL2).then((res) => {
    //   setSampleData(res.data.result.list);
    // });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Next Scroll 뒤로가기 유지를 위한 학습중</h1>

        {filtered.map((movie: any) => {
          return <Movie key={movie.id} movie={movie} />;
        })}

        {/* {sampleData.map((data: any) => {
          return (
            <div key={data.data_val}>
              <h1>{data.paper_title}</h1>
              <img src={data.still_url + data.still_file_name} width={200} height={300} />
            </div>
          );
        })} */}

        <Link href="/detail">
          <a>go Detail</a>
        </Link>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;

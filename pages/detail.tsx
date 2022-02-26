import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { usePreserveScroll } from './hooks/usePreserveScroll';

const Detail = () => {
  const router = useRouter();
  // useEffect(() => {
  //   console.log('DETAIL useEffect');
  //   window.scrollTo(0, 150);
  // }, []);

  // useEffect(() => {
  //   const scroll = (event) => {
  //     const { pageYOffset, scrollY } = window;
  //     console.log('yOffset', pageYOffset, 'scrollY', scrollY);
  //   };
  //   document.addEventListener('scroll', scroll);
  //   // remove event on unmount to prevent a memory leak
  //   return () => {
  //     document.removeEventListener('scroll', scroll);
  //   };
  // }, []);

  // const { changeIsBack } = usePreserveScroll();

  // changeIsBack(false);

  return (
    <>
      <div>detail PAGE</div>

      <div style={{ height: '200px', background: 'red' }}>aaaaaaa</div>
      <div style={{ height: '200px' }}>bbbbbb</div>
      <div style={{ height: '200px', background: 'yellow' }}>cccccc</div>
      <div style={{ height: '200px' }}>dddddd</div>

      <Link href="/">
        <a>
          <div>
            <button> Link href="/" 뒤로가기</button>
          </div>
        </a>
      </Link>

      <button
        onClick={() => {
          router.push('/');
        }}
      >
        router.push('/')
      </button>

      <button
        onClick={() => {
          router.back();
        }}
      >
        router.back
      </button>
    </>
  );
};

export default Detail;
